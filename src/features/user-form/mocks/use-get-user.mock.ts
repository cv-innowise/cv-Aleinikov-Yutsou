import { User } from "@/shared/graphql/users/users.types";
import { vi } from "vitest";

const { userMock, useGetUserMock } = vi.hoisted(() => ({
  userMock: {
    id: "1",
    email: "test@test",
    profile: {
      created_at: "1756969416361",
      full_name: "test test",
      first_name: "test",
      last_name: "test",
      avatar: null,
    },
    cvs: [
      { id: "1", name: "Software Engineer with 4+ years of experiene." },
      { id: "2", name: "Frontend developer." },
    ],
    department_name: "Python",
    position_name: "Systems Analyst",
    role: "Employee",
  },
  useGetUserMock: vi
    .fn()
    .mockImplementation((userId?: User["id"]) =>
      userId ? userMock : undefined
    ),
}));
vi.mock("../queries/use-get-user", () => ({ useGetUser: useGetUserMock }));

export { useGetUserMock, userMock };
