import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  deleteCvMock: vi.fn(),
}));
vi.mock("../mutations/delete-cv", () => ({
  deleteCv: hoisted.deleteCvMock,
}));

export const deleteCvMock = hoisted.deleteCvMock;
