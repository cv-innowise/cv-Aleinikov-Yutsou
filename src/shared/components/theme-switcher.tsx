"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ThemeSwitcher() {
  const t = useTranslations("theme-switcher");
  const { theme, setTheme } = useTheme();

  const onUpdateTheme = (theme: string) => setTheme(theme);

  return (
    <Select defaultValue={theme} onValueChange={onUpdateTheme}>
      <SelectTrigger className="w-full">
          <SelectValue className="capitalize" placeholder={t("toggle")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="w-full">
          <SelectLabel>{t("theme")}</SelectLabel>
          <SelectItem className="block w-full" value="light">
            {t("light")}
          </SelectItem>
          <SelectItem className="block w-full" value="dark">
            {t("dark")}
          </SelectItem>
          <SelectItem className="block w-full" value="system">
            {t("system")}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
