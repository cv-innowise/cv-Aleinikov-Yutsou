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

type ErrorHandlerArg = {
  graphQLErrors?: ReadonlyArray<{ extensions?: Record<string, unknown> }>;
  networkError?: unknown;
  operation: import("@apollo/client").ApolloLink.Operation;
  forward: (op: import("@apollo/client").ApolloLink.Operation) => Observable<ApolloLink.Result>;
};

function hasStatusCode(err: unknown): err is { statusCode: number } {
  return typeof err === "object" && err !== null && "statusCode" in err && typeof (err as { statusCode?: unknown }).statusCode === "number";
}

const errorHandler = ({ graphQLErrors, networkError, operation, forward }: ErrorHandlerArg): Observable<ApolloLink.Result> | void => {
  if (operation.operationName === "UpdateToken") return;

  const hasUnauthenticatedGql = !!graphQLErrors?.some((err) => {
    const code = (err.extensions ?? {}).code;
    return code === "UNAUTHENTICATED";
  });

  const is401 = hasStatusCode(networkError) && networkError.statusCode === 401;

  const unauthenticated = hasUnauthenticatedGql || is401;
  if (!unauthenticated) return;

  return new Observable<ApolloLink.Result>((observer) => {
    const retryWithToken = (newAccessToken: string | null) => {
      if (!newAccessToken) {
        observer.error(new Error("Failed to refresh token"));
        return;
      }
      operation.setContext(({ headers = {} }) => ({
        headers: { ...headers, Authorization: `Bearer ${newAccessToken}` },
      }));
      forward(operation).subscribe(observer);
    };

    if (isRefreshing) {
      addPendingRequest(retryWithToken);
      return;
    }

    isRefreshing = true;

    performTokenRefresh()
      .then((tokens) => {
        setTokens(tokens);
        resolvePendingRequests(tokens.access_token);
        retryWithToken(tokens.access_token);
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
