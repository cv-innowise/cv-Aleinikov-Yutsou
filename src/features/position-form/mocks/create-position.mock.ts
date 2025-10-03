import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  createPositionMock: vi.fn(),
}));
vi.mock("../mutations/create-position", () => ({
  createPosition: hoisted.createPositionMock,
}));

export const createPositionMock =   hoisted.createPositionMock;
