import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  deletePositionMock: vi.fn(),
}));
vi.mock("../mutations/delete-position", () => ({
  deletePosition: hoisted.deletePositionMock,
}));

export const deletePositionMock = hoisted.deletePositionMock;
