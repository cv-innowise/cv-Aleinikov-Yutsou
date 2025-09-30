"use client";

import { User } from "@/shared/graphql/users/users.types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";

interface UserNavProps {
  userId: User["id"];
}

export const UserNav: React.FC<UserNavProps> = ({ userId }) => {
  const pathname = usePathname();
  const t = useTranslations("user-nav");
  const profileHref = `/users/${userId}/profile`;
  const languagesHref = `/users/${userId}/languages`;
  const skillsHref = `/users/${userId}/skills`;

  return (
    <div className="flex space-x-2">
      <Link
        href={profileHref}
        className={cn(
          "p-2 transition-colors hover:text-primary",
          pathname === profileHref && "text-primary border-b"
        )}
      >
        {t("profile")}
      </Link>
      <Link
        href={languagesHref}
        className={cn(
          "p-2 transition-colors hover:text-primary",
          pathname === languagesHref && "text-primary border-b"
        )}
      >
        {t("languages")}
      </Link>
      <Link
        href={skillsHref}
        className={cn(
          "p-2 transition-colors hover:text-primary",
          pathname === skillsHref && "text-primary border-b"
        )}
      >
        {t("skills")}
      </Link>
    </div>
  );
};
