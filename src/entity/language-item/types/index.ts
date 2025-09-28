import { LanguageProficiency } from "@/shared/types/cv-graphql";


export interface LanguageItemProps {
  languages: string[];
  name?: LanguageProficiency["name"];
  proficiency?: LanguageProficiency["proficiency"];
  isEditable: boolean;
  isDisabled: boolean;
  onChange: ({ name, proficiency }: Partial<LanguageProficiency>) => void;
}