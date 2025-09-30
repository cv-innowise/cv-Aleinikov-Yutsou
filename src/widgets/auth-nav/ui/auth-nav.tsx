"use client";

import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AuthNav = () => {
  const pathname = usePathname();
  const t = useTranslations("auth.navbar");
  const isLoginPage = pathname === "/login";

  return (
    <nav className="flex">
      <Link href="/login" className={cn("py-3 px-2 rounded-none transition-all duration-300 border-b-2 border-transparent", isLoginPage && "text-primary border-primary")}>
        {t("login")}
      </Link>

      <Link href="/signup" className={cn("py-3 px-2 rounded-none transition-all duration-300 border-b-2 border-transparent", !isLoginPage && "text-primary border-primary")}>
        {t("signup")}
      </Link>
    </nav>
  );
};
