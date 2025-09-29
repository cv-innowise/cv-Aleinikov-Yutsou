import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  createCvMock: vi.fn(),
}));
vi.mock("../mutations/create-cv", () => ({
  createCv: hoisted.createCvMock,
}));

export const createCvMock = hoisted.createCvMock;
