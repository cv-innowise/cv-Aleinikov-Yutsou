import { Session } from "./types";

const hasDOM = typeof document !== "undefined";

const setCookie = (name: string, value: string | object, days = 7) => {
  if (!hasDOM) return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const cookieValue = typeof value === "object" ? JSON.stringify(value) : value;
  document.cookie = `${name}=${encodeURIComponent(cookieValue)}; expires=${expires}; path=/`;
};

const getCookie = (name: string): object | string | undefined => {
  if (!hasDOM) return undefined;
  const cookieRow = document.cookie.split("; ").find((row) => row.startsWith(name + "="));
  if (!cookieRow) return undefined;
  const cookieValue = decodeURIComponent(cookieRow.split("=")[1]);
  try {
    return JSON.parse(cookieValue);
  } catch {
    return cookieValue;
  }
};

const deleteCookie = (name: string) => {
  if (!hasDOM) return;
  document.cookie = `${name}=; max-age=0; path=/`;
};

const getAccessTokenClientSide = () => {
  return getCookie("access_token") as string | undefined;
};
const getRefreshTokenClientSide = () => {
  return getCookie("refresh_token") as string | undefined;
};

const setAccessTokenClientSide = (access_token: string) => {
  setCookie("access_token", access_token);
};

const setTokens = (access_token: string, refresh_token: string) => {
  setCookie("access_token", access_token);
  setCookie("refresh_token", refresh_token);
};
const clearTokens = () => {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
};

const setSession = (id: string, email: string, role: string) => {
  setCookie("session", { id, email, role });
};

const removeSession = () => {
  deleteCookie("session");
};
const getSession = (): Session => {
  return getCookie("session") as Session;
};

export { getAccessTokenClientSide, getRefreshTokenClientSide, setAccessTokenClientSide, setTokens, clearTokens, setSession, removeSession, getSession };
