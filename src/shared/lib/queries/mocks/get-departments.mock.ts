import { vi } from "vitest";

const { departmentsMock } = vi.hoisted(() => ({
  departmentsMock: [
    {
      id: "3",
      name: "Node",
    },
    {
      id: "4",
      name: "Python",
    },
    {
      id: "5",
      name: "DevOps",
    },
    {
      id: "6",
      name: "Global",
    },
    {
      id: "7",
      name: "Quality Assurance",
    },
    {
      id: "14",
      name: "Blockchain",
    },
    {
      id: "19",
      name: "Java",
    },
  ],
}));
vi.mock("@/shared/lib/queries/get-departments", () => ({
  getDepartments: () => departmentsMock,
}));
vi.mock("@/shared/lib/hooks/use-get-departments", () => ({
  useGetDepartments: () => departmentsMock,
}));

export { departmentsMock };
