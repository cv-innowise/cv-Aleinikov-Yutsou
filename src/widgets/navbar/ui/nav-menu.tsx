"use client";

import React from "react";
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { links } from "../model/links";

export const NavMenu = () => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {links.map((link) => {
          const isActive = link.url === "/" ? pathname === "/" : pathname === link.url || pathname.startsWith(link.url + "/");
          const Icon = link.icon;
          return (
            <SidebarMenuItem key={link.title}>
              <SidebarMenuButton asChild isActive={isActive} tooltip={link.title}>
                <Link href={link.url}>
                  {Icon && <Icon />}
                  <span>{link.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
