export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

let inMemoryAccessToken: string | null = null;
let inMemoryRefreshToken: string | null = null;

const isBrowser = typeof window !== "undefined";

export function hydrateTokensFromStorage() {
  if (!isBrowser) return;
  inMemoryAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  inMemoryRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
}
export function getAccessToken(): string | null {
  if (inMemoryAccessToken === null && isBrowser) {
    inMemoryAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return inMemoryAccessToken;
}

export function getRefreshToken(): string | null {
  if (inMemoryRefreshToken === null && isBrowser) {
    inMemoryRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return inMemoryRefreshToken;
}

export function setTokens(tokens: { access_token: string; refresh_token: string }) {
  inMemoryAccessToken = tokens.access_token;
  inMemoryRefreshToken = tokens.refresh_token;
  if (isBrowser) {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
  }
}

export function clearTokens() {
  inMemoryAccessToken = null;
  inMemoryRefreshToken = null;
  if (isBrowser) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}
