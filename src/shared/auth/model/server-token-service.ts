"use server";

import { cookies } from "next/headers";
import type { UpdateTokenResult } from "cv-graphql";
import { isTokenExpired, isTokenExpiring } from "./token-utils";

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
  return json?.data?.updateToken ?? null;
}

async function ensureServerAccessToken({ skewSec = 30, mutateCookies = false }: { skewSec?: number; mutateCookies?: boolean } = {}): Promise<string | null> {
  const c = await cookies();
  const access = c.get("access_token")?.value;
  if (access && !isTokenExpiring(access, skewSec)) return access;

  const refresh = c.get("refresh_token")?.value;
  if (!refresh || isTokenExpired(refresh)) {
    if (mutateCookies) {
      c.set("access_token", "", { path: "/", maxAge: 0 });
      c.set("refresh_token", "", { path: "/", maxAge: 0 });
    }
    return null;
  }

  const tokens = await updateTokenRequestServer(refresh);
  if (!tokens?.access_token) {
    if (mutateCookies) {
      c.set("access_token", "", { path: "/", maxAge: 0 });
      c.set("refresh_token", "", { path: "/", maxAge: 0 });
    }
    return null;
  }

  if (mutateCookies) {
    c.set("access_token", tokens.access_token, { path: "/" });
    if (tokens.refresh_token) c.set("refresh_token", tokens.refresh_token, { path: "/" });
  }

  return tokens.access_token;
}

async function refreshTokensServerAction(): Promise<boolean> {
  "use server";
  const t = await ensureServerAccessToken({ mutateCookies: true });
  return !!t;
}

export { updateTokenRequestServer, ensureServerAccessToken, refreshTokensServerAction };
