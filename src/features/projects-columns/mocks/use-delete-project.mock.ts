import { vi } from "vitest";

const deleteProjectMock = vi.fn();
vi.mock("../mutations/use-delete-project", () => ({
  useDeleteProject: () => ({
    deleteProject: deleteProjectMock,
    project: {},
    loading: false,
    error: null,
  })
}));

export { deleteProjectMock };
