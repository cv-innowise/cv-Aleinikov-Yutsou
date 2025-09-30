import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  addProfileLanguageMock: vi.fn(),
}));
vi.mock("../mutations/add-profile-language", () => ({
  addProfileLanguage: hoisted.addProfileLanguageMock,
}));

export const addProfileLanguageMock = hoisted.addProfileLanguageMock;
