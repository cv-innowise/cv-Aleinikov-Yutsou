"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { LanguageItemProps } from "../types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { Proficiency } from "@/shared/types/language";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { PROFICIENCY_TEXT_COLOR } from "../consts";
import { useTranslations } from "next-intl";

export const EditableLanguageItem: React.FC<LanguageItemProps> = ({
  languages,
  name,
  proficiency,
  onChange,
  isDisabled,
}) => {
  const t =useTranslations("language-item")
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    name || t("add-language")
  );
  const [selectedProficiency, setSelectedProficiency] = useState<Proficiency>(
    proficiency || Proficiency.A1
  );
  const [open, setOpen] = useState<boolean>(false);

  const onLanguageChage = (newLanguage: string) => {
    if (newLanguage !== selectedLanguage) {
      setSelectedLanguage(newLanguage);
      onChange({ name: newLanguage });
    }
    setOpen(false);
  };

  const onProficiencyChange = (newProficiency: Proficiency) => {
    setSelectedProficiency(newProficiency);
    onChange({ proficiency: newProficiency });
  };

  return (
    <div className="min-w-[200px] w-min px-4 py-2 flex justify-center items-center space-x-2 rounded-full transition-colors hover:bg-black/5">
      <Select
        defaultValue={selectedProficiency}
        onValueChange={onProficiencyChange}
        disabled={isDisabled}
      >
        <SelectTrigger
          className={cn(
            "border-none shadow-none focus:border-none uppercase",
            isDisabled
              ? "text-muted-foreground"
              : PROFICIENCY_TEXT_COLOR[selectedProficiency]
          )}
          data-testid="proficiency-button"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(Proficiency).map((prof) => (
            <SelectItem value={prof} key={prof}>
              {prof}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={isDisabled}>
          <Button
            variant="ghost"
            size="sm"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-min min-w-[50px] justify-between text-sm",
              isDisabled && "text-muted-foreground"
            )}
            data-testid="language-button"
          >
            {selectedLanguage || t("select-language")}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={t("search-language")} className="h-9" />
            <CommandList>
              <CommandEmpty>{t("no-languages")}</CommandEmpty>
              {languages.map((language) => (
                <CommandGroup key={language}>
                  <CommandItem value={language} onSelect={onLanguageChage}>
                    {language}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedLanguage === language
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
