import { LanguageProficiency, Proficiency } from "@/shared/types/cv-graphql";
import { vi } from "vitest";

const languagesMock= [
  {
    id: "1",
    name: "English",
    native_name: "English",
    iso2: "EN",
  },
  {
    id: "2",
    name: "Russian",
    native_name: "Русский",
    iso2: "RU",
  },
  {
    id: "3",
    name: "German",
    native_name: "Deutsch",
    iso2: "DE",
  },
  {
    id: "4",
    name: "Polish",
    native_name: "Język polski",
    iso2: "PL",
  }
];
const languagesWithProficiencyMock: LanguageProficiency[] = [
  {
    name: "Italian",
    proficiency: Proficiency.B2,
  },
  {
    name: "Polish",
    proficiency: Proficiency.C2,
  },
  {
    name: "German",
    proficiency: Proficiency.Native,
  },
];
const addLanguageMock = vi.fn();
const updateLanguageMock = vi.fn();
const deleteLanguagesMock = vi.fn();

export {
  languagesMock,
  languagesWithProficiencyMock,
  addLanguageMock,
  updateLanguageMock,
  deleteLanguagesMock,
};
