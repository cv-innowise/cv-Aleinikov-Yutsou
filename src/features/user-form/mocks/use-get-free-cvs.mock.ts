import { vi } from "vitest";

const { freeCvsMock } = vi.hoisted(() => ({
  freeCvsMock: [
    {
      id: "978",
      name: "test1",
      description: "description",
      user: null,
    },
    {
      id: "981",
      name: "test2",
      description: "description",
      user: null,
    },
  ],
}));

vi.mock("../queries/use-get-free-cvs", () => ({
  useGetFreeCvs: () => freeCvsMock,
}));

export { freeCvsMock };