import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  deleteProfileLanguagesMock: vi.fn(),
}));
vi.mock("../mutations/delete-profile-languages", () => ({
  deleteProfileLanguages: hoisted.deleteProfileLanguagesMock,
}));

export const deleteProfileLanguagesMock = hoisted.deleteProfileLanguagesMock;
