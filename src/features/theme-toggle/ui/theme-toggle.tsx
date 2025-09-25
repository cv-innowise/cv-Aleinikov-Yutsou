"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { Select, SelectGroup, SelectContent, SelectTrigger, SelectValue, SelectItem, SelectLabel } from "@/shared/components/ui/select";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const value = mounted ? theme ?? "system" : undefined;

  return (
    <Select value={value} onValueChange={(v) => setTheme(v as "light" | "dark" | "system")}>
      <SelectTrigger className="w-48">
        <SelectValue className="capitalize" placeholder="Appearance" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          <SelectItem value="light">
            <span className="flex items-center gap-2">
              <Sun size={16} /> Light
            </span>
          </SelectItem>
          <SelectItem value="dark">
            <span className="flex items-center gap-2">
              <Moon size={16} /> Dark
            </span>
          </SelectItem>
          <SelectItem value="system">
            <span className="flex items-center gap-2">
              <Laptop size={16} /> System
            </span>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
