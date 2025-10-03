import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  createUserMock: vi.fn(),
}));
vi.mock("../mutations/create-user", () => ({
  createUser: hoisted.createUserMock,
}));

export const createUserMock = hoisted.createUserMock;
