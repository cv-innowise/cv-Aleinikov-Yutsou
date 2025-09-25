"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/shared/components/ui/breadcrumb";

export const AppBreadcrumbs = () => {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {parts.map((part, idx) => {
          const href = "/" + parts.slice(0, idx + 1).join("/");
          return (
            <React.Fragment key={href}>
              {idx > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbLink className="capitalize" href={href}>
                  {decodeURIComponent(part)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
