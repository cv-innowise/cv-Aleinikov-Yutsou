import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  deleteAvatarMock: vi.fn(),
}));
vi.mock("../mutations/delete-avatar", () => ({
  deleteAvatar: hoisted.deleteAvatarMock,
}));

export const deleteAvatarMock = hoisted.deleteAvatarMock;
