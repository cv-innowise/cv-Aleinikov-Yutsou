import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  createDepartmentMock: vi.fn(),
}));
vi.mock("../mutations/create-department", () => ({
  createDepartment: hoisted.createDepartmentMock,
}));

export const createDepartmentMock =   hoisted.createDepartmentMock;
