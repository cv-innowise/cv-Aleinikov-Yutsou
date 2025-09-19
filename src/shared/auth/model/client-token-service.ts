import { clearTokens, getAccessTokenClientSide, getRefreshTokenClientSide, setTokens } from "@/shared/lib/cookies";
import { UpdateTokenResult } from "cv-graphql";
import { jwtDecode } from "jwt-decode";

type JwtPayload = { exp?: number };

const isTokenExpired = (token?: string): boolean => {
  try {
    if (!token) return true;
    const { exp } = jwtDecode<JwtPayload>(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

const isTokenExpiring = (token?: string, skewSec = 30): boolean => {
  try {
    if (!token) return true;
    const { exp } = jwtDecode<JwtPayload>(token);
    if (!exp) return true;
    const expMs = exp * 1000;
    return Date.now() >= expMs - skewSec * 1000;
  } catch {
    return true;
  }
};

const updateTokenRequest = async (refresh_token: string | undefined): Promise<UpdateTokenResult | null> => {
  if (!refresh_token) return null;

  const res = await fetch("https://cv-project-js.inno.ws/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refresh_token}`,
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

  if (!res.ok) return null;

  const data = await res.json().catch(() => null);
  const tokens = data.data?.updateToken;
  return tokens;
};

let refreshPromise: Promise<string | null> | null = null;

const getAccessToken = async (): Promise<string | null> => {
  const isServer = typeof window === "undefined";
  if (isServer) return null;

  const access = getAccessTokenClientSide();
  const refresh = getRefreshTokenClientSide();

  if (access && !isTokenExpiring(access, 30)) return access;

  if (!refresh || isTokenExpired(refresh)) {
    clearTokens();
    return null;
  }

  if (!refreshPromise) {
    refreshPromise = (async () => {
      const tokens = await updateTokenRequest(refresh);
      if (!tokens?.access_token) {
        clearTokens();
        return null;
      }
      setTokens(tokens.access_token, tokens.refresh_token);
      return tokens.access_token;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return await refreshPromise;
};

async function updateTokenRequestServer(refresh_token?: string): Promise<UpdateTokenResult | null> {
  if (!refresh_token) return null;

  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "https://cv-project-js.inno.ws/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refresh_token}`,
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
    cache: "no-store",
  });

  if (!res.ok) return null;
  const json = await res.json().catch(() => null);
  const tokens = json?.data?.updateToken as UpdateTokenResult | undefined;
  return tokens ?? null;
}

export { getAccessToken, getAccessTokenClientSide, getRefreshTokenClientSide, updateTokenRequestServer, clearTokens, setTokens };
