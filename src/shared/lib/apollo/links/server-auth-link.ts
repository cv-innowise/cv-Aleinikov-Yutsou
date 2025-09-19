import { SetContextLink } from "@apollo/client/link/context";
import { ensureServerAccessToken } from "@/shared/auth/model/server-token-service";

export const serverAuthLink = new SetContextLink(async (prevContext) => {
  if (typeof window !== "undefined") {
    return { headers: { ...prevContext.headers } };
  }

  const token = await ensureServerAccessToken({ skewSec: 30, mutateCookies: false });

  const headers: Record<string, string> = { ...prevContext.headers };
  if (token) headers.authorization = `Bearer ${token}`;
  return { headers };
});
