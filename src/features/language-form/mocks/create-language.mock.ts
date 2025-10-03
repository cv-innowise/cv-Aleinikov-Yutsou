import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  createLanguageMock: vi.fn(),
}));
vi.mock("../mutations/create-language", () => ({
  createLanguage: hoisted.createLanguageMock,
}));

export const createLanguageMock =   hoisted.createLanguageMock;
