import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({ deleteProjectMock: vi.fn() }));
vi.mock("../mutations/delete-project", () => ({
  deleteProject: deleteProjectMock,
}));

export const deleteProjectMock = hoisted.deleteProjectMock;
