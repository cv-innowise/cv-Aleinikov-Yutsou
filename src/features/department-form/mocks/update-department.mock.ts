import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  updateDepartmentMock: vi.fn(),
}));
vi.mock("../mutations/update-department", () => ({
  updateDepartment: hoisted.updateDepartmentMock,
}));

export const updateDepartmentMock = hoisted.updateDepartmentMock;
