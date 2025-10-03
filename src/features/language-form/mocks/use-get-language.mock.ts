import { Language } from "@/shared/graphql/languages/languages.types";
import { vi } from "vitest";

const { languageMock, useGetLanguageMock } = vi.hoisted(() => ({
  languageMock: {
    id: "1",
    name: "languageName",
    native_name: "languageNativeName",
    iso2: "ln",
  },
  useGetLanguageMock: (languageId?: Language["id"]) =>
    languageId ? languageMock : undefined,
}));
vi.mock("../queries/use-get-language", () => ({
  useGetLanguage: useGetLanguageMock,
}));

export { languageMock, useGetLanguageMock };