import { Department } from "@/shared/graphql/departments/departments.types";
import { Position } from "@/shared/graphql/positions/positions.types";
import { Profile } from "@/shared/graphql/profile/profile.types";
import { User } from "@/shared/graphql/users/users.types";
import { UserRole } from "@/shared/types/cv-graphql";

const profileMock: Profile = {
  id: "760",
  created_at: "1757939935461",
  first_name: "Test",
  last_name: "Test",
  full_name: "Test Test",
  avatar: "link",
  skills: [],
  languages: [],
};
const userMock: User = {
  id: "1",
  email: "test@test",
  profile: {
    created_at: "1756969416361",
    full_name: "test test",
    first_name: "test",
    last_name: "test",
    avatar: null,
  },
  department: {
    id: "3",
  },
  department_name: "Node",
  position: {
    id: "3",
  },
  position_name: "Network Engineer",
  role: UserRole.Employee,
};
const departmentsMock: Department[] = [
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
];
const positionsMock: Position[] = [
  {
    id: "2",
    name: "Systems Analyst",
  },
  {
    id: "3",
    name: "Network Engineer",
  },
  {
    id: "4",
    name: "Database Administrator",
  },
  {
    id: "5",
    name: "UX Designer",
  },
  {
    id: "6",
    name: "Support Specialist",
  },
  {
    id: "7",
    name: "Data Analyst",
  },
];

export { profileMock, userMock, departmentsMock, positionsMock };
