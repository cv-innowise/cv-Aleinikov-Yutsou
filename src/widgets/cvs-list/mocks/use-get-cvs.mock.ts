import { vi } from "vitest";

const cvsMock = [
  {
    id: "978",
    name: "testName1",
    description: "testDescription1",
    user: {
      id: "744",
      email: "test1.test@gmail.com",
    },
  },
  {
    id: "981",
    name: "testName2",
    description: "testDescription2",
    user: {
      id: "744",
      email: "test2.test@gmail.com",
    },
  },
  {
    id: "991",
    name: "testName3",
    description: "testDescription3",
    user: {
      id: "744",
      email: "test3.test@gmail.com",
    },
  },
];
vi.mock("../queries/use-get-cvs.ts", () => ({ getCvs: () => cvsMock }));

export { cvsMock };
