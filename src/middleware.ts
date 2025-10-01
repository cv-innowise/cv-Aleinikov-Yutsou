import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales } from "@/i18n/locales";

const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.get("locale")) {
    const acceptLanguage = request.headers.get("accept-language") || "";
    let detected = defaultLocale;

    for (const lang of acceptLanguage.split(",").map((l) => l.split(";")[0])) {
      const main = lang.split("-")[0];
      if ((locales as readonly string[]).includes(main)) {
        detected = main;
        break;
      }
    }

    response.cookies.set("locale", detected, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
