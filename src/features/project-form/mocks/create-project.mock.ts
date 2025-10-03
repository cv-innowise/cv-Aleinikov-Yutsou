import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  createProjectMock: vi.fn(),
}));
vi.mock("../mutations/create-project", () => ({
  createProject: hoisted.createProjectMock,
}));

export const createProjectMock =   hoisted.createProjectMock;
