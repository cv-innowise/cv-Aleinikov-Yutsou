import {
  Language as FullLanguage,
  CreateLanguageInput,
  UpdateLanguageInput,
  DeleteLanguageInput,
  DeleteResult,
} from "@/shared/types/cv-graphql";

type Language = Omit<FullLanguage, "created_at">;

type LanguagesResponse = { languages: Language[] };
type CreateLanguageResponse = { createLanguage: Language };
type UpdateLanguageResponse = { updateLanguage: Language };
type DeleteLanguageResponse = { deleteLanguage: DeleteResult };

type CreateLanguageRequest = { language: CreateLanguageInput };
type UpdateLanguageRequest = { language: UpdateLanguageInput };
type DeleteLanguageRequest = { language: DeleteLanguageInput };

export type {
  Language,
  LanguagesResponse,
  CreateLanguageResponse,
  UpdateLanguageResponse,
  DeleteLanguageResponse,
  CreateLanguageRequest,
  UpdateLanguageRequest,
  DeleteLanguageRequest,
};
