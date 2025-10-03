import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  updateLanguageMock: vi.fn(),
}));
vi.mock("../mutations/update-language", () => ({
  updateLanguage: hoisted.updateLanguageMock,
}));

export const updateLanguageMock = hoisted.updateLanguageMock;
