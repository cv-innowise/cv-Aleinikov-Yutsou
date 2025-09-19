"use client";

import { getAccessToken } from "@/shared/auth";
import { SetContextLink } from "@apollo/client/link/context";

export const clientAuthLink = new SetContextLink(async (prevContext) => {
  if (typeof window === "undefined") return { headers: { ...prevContext.headers } };
  const token = await getAccessToken();

  return {
    headers: {
      ...prevContext.headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});
