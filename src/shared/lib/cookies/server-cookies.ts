"use server";

import { cookies } from "next/headers";
import { Session } from "./types";

const getAccessTokenServerSide = async () => {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("access_token")?.value;
  return myCookie;
};

const getRefreshTokenServerSide = async () => {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("refresh_token")?.value;
  return myCookie;
};

const getSessionServerSide = async (): Promise<Session | undefined> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return undefined;
  const sessionValue = decodeURIComponent(sessionCookie);
  try {
    return JSON.parse(sessionValue);
  } catch {
    return undefined;
  }
};

export { getAccessTokenServerSide, getRefreshTokenServerSide, getSessionServerSide };
