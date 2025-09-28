import { vi } from "vitest";

export const { languagesMock } = vi.hoisted(() => ({
  languagesMock: [
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
    },
  ],
}));
vi.mock("@/shared/lib/queries/get-languages", () => ({
  getLanguages: () => languagesMock,
}));
