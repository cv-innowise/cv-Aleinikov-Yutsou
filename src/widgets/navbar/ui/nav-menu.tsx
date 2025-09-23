"use client";

import React from "react";
import { linkItem } from "../model/links";
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Users, TrendingUp, FileUser, Languages } from "lucide-react";

const icons = {
  Users: Users,
  TrendingUp: TrendingUp,
  FileUser: FileUser,
  Languages: Languages,
};

interface NavMenuProps {
  links: linkItem[];
}

export const NavMenu: React.FC<NavMenuProps> = ({ links }) => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {links.map((link) => {
          const Icon = icons[link.icon as keyof typeof icons];
          const isActive = pathname === link.url;
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
