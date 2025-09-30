import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  updateProfileLanguageMock: vi.fn(),
}));
vi.mock("../mutations/update-profile-language", () => ({
  updateProfileLanguage: hoisted.updateProfileLanguageMock,
}));

export const updateProfileLanguageMock = hoisted.updateProfileLanguageMock;
