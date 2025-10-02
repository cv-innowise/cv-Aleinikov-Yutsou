import {
  User as FullUser,
  CreateUserInput,
  UpdateUserInput,
  DeleteResult,
} from "@/shared/types/cv-graphql";
import { Department } from "../departments/departments.types";
import { Position } from "../positions/positions.types";
import { CvItem } from "../cvs/cvs.types";

type UserCv = Pick<CvItem, "id" | "name">;
type UserItem = Pick<
  FullUser,
  "id" | "email" | "department_name" | "position_name"
> & {
  profile: Pick<FullUser["profile"], "avatar" | "first_name" | "last_name">;
};

type User = Pick<
  FullUser,
  "id" | "email" | "department_name" | "position_name" | "role"
> & {
  profile: Pick<
    FullUser["profile"],
    "created_at" | "full_name" | "first_name" | "last_name" | "avatar"
  >;
  cvs?: UserCv[];
  department?: { id: Department["id"] } | null;
  position?: { id: Position["id"] } | null;
};

type UserRequest = { userId: User["id"] };
type CreateUserRequest = { user: CreateUserInput };
type UpdateUserRequest = { user: UpdateUserInput };
type DeleteUserRequest = { userId: User["id"] };

type UsersResponse = { users: UserItem[] };
type UserResponse = { user: User };
type CreateUserResponse = { createUser: User };
type UpdateUserResponse = { updateUser: User };
type DeleteUserResponse = { deleteUser: DeleteResult };

export type {
  UserCv,
  UserItem,
  User,
  UserRequest,
  CreateUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
  UsersResponse,
  UserResponse,
  CreateUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
};
