import { vi } from "vitest";

const deleteLanguageMock = vi.fn();
vi.mock("../mutations/use-delete-language", () => ({
  useDeleteLanguage: () => ({
    deleteLanguage: deleteLanguageMock,
    language: {},
    loading: false,
    error: null,
  })
}));

export { deleteLanguageMock };
