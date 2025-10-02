import { vi } from "vitest";

const { userMock } = vi.hoisted(() => ({
  userMock: {
    id: "1",
    email: "test.test@gmail.com",
    profile: {
      avatar: "image.png",
      created_at: "1757939935461",
      first_name: "tests",
      full_name: "tests test",
      last_name: "test",
    },
    cvs: [
      { id: "984", name: "New cv1234" },
      { id: "1015", name: "new 3" },
      { id: "1014", name: "New cv 2 asdfghj" },
    ],
    department: { id: "14" },
    department_name: "Blockchain",
    position: { id: "7" },
    position_name: "Data Analyst",
    role: "Employee",
  },
}));
vi.mock("../queries/get-user", () => ({
  getUser: () => userMock,
}));

export { userMock };
