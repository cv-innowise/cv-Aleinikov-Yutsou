import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  deleteLanguageMock: vi.fn(),
}));
vi.mock("../mutations/delete-language", () => ({
  deleteLanguage: hoisted.deleteLanguageMock,
}));

export const deleteLanguageMock = hoisted.deleteLanguageMock;
