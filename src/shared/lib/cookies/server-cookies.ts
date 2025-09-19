"use server";

import { cookies } from "next/headers";

export const getAccessTokenServerSide = async () => {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("access_token")?.value;
  return myCookie;
};

export const getRefreshTokenServerSide = async () => {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("refresh_token")?.value;
  return myCookie;
};
