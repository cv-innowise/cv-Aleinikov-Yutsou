"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/shared/components/ui/breadcrumb";
import { UserCrumb } from "@/entity/user";
import { CvCrumb } from "@/entity/cv";
import { useTranslations } from "next-intl";

export const AppBreadcrumbs = () => {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const t = useTranslations("breadcrumbs");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {parts.map((part, idx) => {
          const href = "/" + parts.slice(0, idx + 1).join("/");

          if (parts[idx - 1] === "users") {
            return <UserCrumb key={href} id={part} href={href} />;
          }
          if (parts[idx - 1] === "cvs") {
            return <CvCrumb key={href} id={part} href={href} />;
          }

          return (
            <React.Fragment key={href}>
              {idx > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbLink className="capitalize" href={href}>
                  {t(part) || part}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
