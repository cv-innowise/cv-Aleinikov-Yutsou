import { SetContextLink } from "@apollo/client/link/context";

export const serverAuthLink = new SetContextLink(async (prevContext, operation) => {
  let token;

  if (typeof window === "undefined") {
    let { cookies } = await import("next/headers");
    const myCookies = await cookies();
    token = myCookies.get("access_token")?.value;
  }

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
