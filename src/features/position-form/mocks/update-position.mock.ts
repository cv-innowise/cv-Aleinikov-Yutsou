import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  updatePositionMock: vi.fn(),
}));
vi.mock("../mutations/update-position", () => ({
  updatePosition: hoisted.updatePositionMock,
}));

export const updatePositionMock = hoisted.updatePositionMock;
