"use client";

import React from "react";
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { links } from "../model/links";
import { useTranslations } from "next-intl";

export const NavMenu = () => {
  const pathname = usePathname();
  const t = useTranslations("sidebar");

  return (
    <SidebarGroup>
      <SidebarMenu>
        {links.map((link) => {
          const isActive = link.url === "/" ? pathname === "/" : pathname === link.url || pathname.startsWith(link.url + "/");
          const Icon = link.icon;
          const title = t(link.titleKey);
          return (
            <SidebarMenuItem key={title}>
              <SidebarMenuButton asChild isActive={isActive} tooltip={title}>
                <Link href={link.url}>
                  {Icon && <Icon />}
                  <span>{title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
