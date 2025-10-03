import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  updateCvMock: vi.fn(),
}));
vi.mock("../mutations/update-cv", () => ({
  updateCv: hoisted.updateCvMock,
}));

export const updateCvMock = hoisted.updateCvMock;
