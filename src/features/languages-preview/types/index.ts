import { Language } from "@/shared/graphql/languages/languages.types";
import { LanguageProficiency } from "@/shared/types/cv-graphql";

export interface LanguagesPreviewProps {
  languages: Language[];
  languagesWithProficiency: LanguageProficiency[];
  addLanguage: (language: LanguageProficiency) => Promise<void>;
  updateLanguage: (language: LanguageProficiency) => Promise<void>;
  deleteLanguages: (language: { name: string[] }) => Promise<void>;
  isEditable: boolean;
}