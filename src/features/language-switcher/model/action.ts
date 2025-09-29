"use server";

import { locales, type LocaleType } from "@/i18n/locales";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

function isLocale(value: string): value is LocaleType {
  return locales.some((l) => l === value);
}

export async function setLocale(locale: string) {
  if (!isLocale(locale)) throw new Error("Unsupported locale");

  const myCookie = await cookies();

  myCookie.set("locale", locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === "production",
  });

  revalidatePath("/", "layout");
}
