import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  updateProjectMock: vi.fn(),
}));
vi.mock("../mutations/update-project", () => ({
  updateProject: hoisted.updateProjectMock,
}));

export const updateProjectMock = hoisted.updateProjectMock;
