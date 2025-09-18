"use client";

import { SetContextLink } from "@apollo/client/link/context";

export const clientAuthLink = new SetContextLink(async (prevContext, operation) => {
  let token;
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const myCookies = await cookies();
    token = myCookies.get("access_token")?.value;
  } else {
    token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];
  }

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
