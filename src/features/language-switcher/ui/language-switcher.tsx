"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Select, SelectGroup, SelectContent, SelectTrigger, SelectValue, SelectItem, SelectLabel } from "@/shared/components/ui/select";
import { locales, localesLabels } from "@/i18n/locales";
import { setLocale } from "../model/action";

export const LanguageSwitcher = () => {
  const router = useRouter();
  const current = useLocale();

  const onChange = async (value: string) => {
    await setLocale(value);
    router.refresh();
  };

  return (
    <Select defaultValue={current} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue className="capitalize" placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {locales.map((locale) => (
            <SelectItem className="capitalize" key={locale} value={locale}>
              {localesLabels[locale]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
