import { vi } from "vitest";

const { cvsMock } = vi.hoisted(() => ({
  cvsMock: [
    {
      id: "978",
      name: "testName1",
      description: "SomeText1",
      user: {
        id: "744",
        email: "test1.test@gmail.com",
      },
    },
    {
      id: "981",
      name: "testName2",
      description: "SomeText2",
      user: {
        id: "744",
        email: "test2.test@gmail.com",
      },
    },
    {
      id: "991",
      name: "testName3",
      description: "SomeText3",
      user: {
        id: "744",
        email: "test3.test@gmail.com",
      },
    },
  ],
}));
vi.mock("../queries/get-cvs", () => ({ getCvs: () => cvsMock }));

export { cvsMock };
