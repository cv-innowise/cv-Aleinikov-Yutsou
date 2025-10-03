import { Department } from "@/shared/graphql/departments/departments.types";
import { vi } from "vitest";

const { departmentMock, useGetDeparmentMock } = vi.hoisted(() => ({
  departmentMock: {
    id: "3",
    name: "Node",
  },
  useGetDeparmentMock: (departmentId?: Department["id"]) => {
    if (!departmentId) {
      return;
    }

    return departmentMock;
  },
}));
vi.mock("../queries/use-get-department", () => ({
  useGetDepartment: useGetDeparmentMock,
}));

export { departmentMock, useGetDeparmentMock };
