import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  updateUserMock: vi.fn(),
}));
vi.mock("../mutations/update-user", () => ({
  updateUser: hoisted.updateUserMock,
}));

export const updateUserMock = hoisted.updateUserMock;
