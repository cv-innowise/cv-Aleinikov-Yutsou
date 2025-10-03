import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  updateProfileMock: vi.fn(),
}));
vi.mock("../mutations/update-profile", () => ({
  updateProfile: hoisted.updateProfileMock,
}));

export const updateProfileMock = hoisted.updateProfileMock;
