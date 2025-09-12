import { ApolloClient, ApolloLink, InMemoryCache, Observable } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { ErrorLink } from "@apollo/client/link/error";
import { getAccessToken, getRefreshToken, setTokens, clearTokens, hydrateTokensFromStorage } from "@/shared/auth";

if (typeof window !== "undefined") {
  hydrateTokensFromStorage();
}

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string;
if (!GRAPHQL_URL) {
  throw new Error("GRAPHQL_URL is not defined in environment variables");
}

const httpLink = new HttpLink({ uri: GRAPHQL_URL });

const authLink = new ApolloLink((operation, forward) => {
  const isUpdateToken = operation.operationName === "UpdateToken";
  const token = isUpdateToken ? getRefreshToken() : getAccessToken();

  operation.setContext(({ headers = {} }) => ({
    headers: { ...headers, Authorization: token ? `Bearer ${token}` : "" },
  }));

  return forward(operation);
});

let isRefreshing = false;
let pendingRequests: Array<(token: string | null) => void> = [];

function addPendingRequest(cb: (token: string | null) => void) {
  pendingRequests.push(cb);
}
function resolvePendingRequests(token: string | null) {
  pendingRequests.forEach((cb) => cb(token));
  pendingRequests = [];
}

async function performTokenRefresh(): Promise<{ access_token: string; refresh_token: string }> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token");

  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
    body: JSON.stringify({
      query: `
        mutation UpdateToken {
          updateToken {
            access_token
            refresh_token
          }
        }
      `,
    }),
  });

  if (!res.ok) {
    throw new Error(`Refresh failed with status ${res.status}`);
  }
  const body = await res.json();
  const tokens = body?.data?.updateToken;
  if (!tokens?.access_token || !tokens?.refresh_token) {
    throw new Error("Invalid refresh response");
  }
  return tokens;
}

type ErrorHandler = ConstructorParameters<typeof ErrorLink>[0];

const errorHandler: ErrorHandler = (arg) => {
  const e = arg as any;

  const operation = e.operation as { operationName?: string };
  const forward = e.forward as (op: any) => any;
  const graphQLErrors = e.graphQLErrors as Array<{ extensions?: Record<string, unknown> }> | undefined;
  const networkError = e.networkError as unknown;

  if (operation?.operationName === "UpdateToken") return;

  const hasUnauthenticatedGql = Array.isArray(graphQLErrors) && graphQLErrors.some((err) => (err?.extensions as any)?.code === "UNAUTHENTICATED");

  const is401 = !!networkError && typeof networkError === "object" && "statusCode" in (networkError as object) && typeof (networkError as any).statusCode === "number" && (networkError as any).statusCode === 401;

  const unauthenticated = hasUnauthenticatedGql || is401;
  if (!unauthenticated) return;

  return new Observable<ApolloLink.Result>((observer) => {
    if (isRefreshing) {
      addPendingRequest((newAccessToken) => {
        if (!newAccessToken) {
          observer.error(new Error("Failed to refresh token"));
          return;
        }
        e.operation.setContext(({ headers = {} }) => ({
          headers: { ...headers, Authorization: `Bearer ${newAccessToken}` },
        }));
        forward(e.operation).subscribe(observer);
      });
      return;
    }

    isRefreshing = true;

    performTokenRefresh()
      .then((tokens) => {
        setTokens(tokens);
        resolvePendingRequests(tokens.access_token);

        e.operation.setContext(({ headers = {} }) => ({
          headers: { ...headers, Authorization: `Bearer ${tokens.access_token}` },
        }));
        forward(e.operation).subscribe(observer);
      })
      .catch((err) => {
        resolvePendingRequests(null);
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.replace("/login");
        }
        observer.error(err);
      })
      .finally(() => {
        isRefreshing = false;
      });
  });
};

const errorLink = new ErrorLink(errorHandler);

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
