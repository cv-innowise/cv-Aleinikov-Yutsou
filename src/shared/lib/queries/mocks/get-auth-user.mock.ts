import { vi } from "vitest";

const { getAuthUserMock, userMock, adminUserMock } = vi.hoisted(() => ({
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
    department_name: null,
    position_name: null,
    role: "Employee",
  },
  adminUserMock: {
    id: "1",
    email: "test@test",
    profile: {
      created_at: "1756969416361",
      full_name: "test test",
      first_name: "test",
      last_name: "test",
      avatar: null,
    },
    department_name: null,
    position_name: null,
    role: "Admin",
  },
  getAuthUserMock: vi.fn().mockImplementation(() => userMock),
}));
vi.mock("@/shared/lib/queries/get-auth-user", () => ({
  getAuthUser: getAuthUserMock,
}));
vi.mock("@/shared/lib/hooks/use-get-auth-user", () => ({
  useGetAuthUser: getAuthUserMock,
}));

export { getAuthUserMock, userMock, adminUserMock }; 