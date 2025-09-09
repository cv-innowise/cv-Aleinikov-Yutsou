import { Language, Proficiency } from "@/shared/types/language";

export interface LanguageItemProps {
  languages: string[];
  name?: string;
  proficiency?: Proficiency;
  isEditable: boolean;
  isDisabled: boolean;
  onChange: ({ name, proficiency }: Partial<Language>) => void;
}