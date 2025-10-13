"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { SidebarMenuButton } from "@/shared/components/ui/sidebar";
import Link from "next/link";
import { LogOut, User, Settings } from "lucide-react";
import { clearTokens, removeSession } from "@/shared/lib/cookies";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { User as UserType } from "@/shared/graphql/users";
import { useTranslations } from "next-intl";

interface UserPopoverProps {
  user: UserType | undefined;
}

export const UserPopover: React.FC<UserPopoverProps> = ({ user }) => {
  const router = useRouter();
  const t = useTranslations("sidebar");

  const onLogout = () => {
    clearTokens();
    removeSession();
    router.push("/login");
  };

  const itemCls = "flex items-center gap-2 hover:bg-secondary/80 p-1.5 text-sm rounded-md";
  const userName = user?.profile.full_name || user?.email;
  const avatarUrl = user?.profile.avatar;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" size="lg">
          <Avatar className="h-8 w-8 rounded-lg">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={userName} />}
            <AvatarFallback className="rounded-lg">{userName?.[0].toUpperCase() ?? "U"}</AvatarFallback>
          </Avatar>
          <p className="truncate font-medium">{userName}</p>
        </SidebarMenuButton>
      </PopoverTrigger>
      <PopoverContent side="top" align="start" className="flex flex-col gap-1.5 p-2">
        <Link className={itemCls} href={`/users/${user?.id}/profile`}>
          <User size={18} />
          {t("profile")}
        </Link>
        <Link className={itemCls} href="/settings">
          <Settings size={18} />
          {t("settings")}
        </Link>
        <button onClick={onLogout} className={cn(itemCls, "cursor-pointer")}>
          <LogOut className="text-primary" size={18} />
          {t("logout")}
        </button>
      </PopoverContent>
    </Popover>
  );
};
