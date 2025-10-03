import { vi } from "vitest";

const { deleteDepartmentMock } = vi.hoisted(() => ({
  deleteDepartmentMock: vi.fn(),
}));
vi.mock("../mutations/delete-department", () => ({
  deleteDepartment: deleteDepartmentMock,
}));

export { deleteDepartmentMock };
