import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  deleteUserMock: vi.fn(),
}));
vi.mock("../mutations/delete-user", () => ({
  deleteUser: hoisted.deleteUserMock,
}));

export const deleteUserMock = hoisted.deleteUserMock;
