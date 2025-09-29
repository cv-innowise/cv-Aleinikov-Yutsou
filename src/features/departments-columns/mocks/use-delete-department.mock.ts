import { vi } from "vitest";

const deleteDepartmentMock = vi.fn();
vi.mock("../mutations/use-delete-department", () => ({
  useDeleteDepartment: () => ({
    deleteDepartment: deleteDepartmentMock,
    department: {},
    loading: false,
    error: null,
  })
}));

export { deleteDepartmentMock };
