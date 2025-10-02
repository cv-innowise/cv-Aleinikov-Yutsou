import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  uploadAvatarMock: vi.fn(),
}));
vi.mock("../mutations/upload-avatar", () => ({
  uploadAvatar: hoisted.uploadAvatarMock,
}));

export const uploadAvatarMock = hoisted.uploadAvatarMock;
