"use server";

import { locales } from "@/i18n/locales";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function setLocale(locale: string) {
  if (!locales.includes(locale as any)) throw new Error("Unsupported locale");

  const myCookie = await cookies();

  myCookie.set("locale", locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === "production",
  });

  revalidatePath("/", "layout");
}
