import type { User as UserType } from "cv-graphql";

const EMPLOYEE_ROLE = "Employee" as UserType["role"];

export const mockUser: UserType = {
  id: "1",
  email: "john.doe@example.com",
  created_at: new Date().toISOString(),
  is_verified: true,
  role: EMPLOYEE_ROLE,
  profile: {
    id: "profile-1",
    created_at: new Date().toISOString(),
    full_name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
    skills: [],
    languages: [],
  },
};

export const mockUserWithoutAvatar: UserType = {
  id: "1",
  email: "john.doe@example.com",
  created_at: new Date().toISOString(),
  is_verified: true,
  role: EMPLOYEE_ROLE,
  profile: {
    id: "profile-1",
    created_at: new Date().toISOString(),
    full_name: "John Doe",
    skills: [],
    languages: [],
  },
};
