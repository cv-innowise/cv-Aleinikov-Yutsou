import {
  Department as FullDepartment,
  CreateDepartmentInput,
  UpdateDepartmentInput,
  DeleteDepartmentInput,
  DeleteResult,
} from "@/shared/types/cv-graphql";

type Department = Pick<FullDepartment, "id" | "name">;

type DepartmentsResponse = { departments: Department[] };
type CreateDepartmentResponse = { createDepartment: Department };
type UpdateDepartmentResponse = { updateDepartment: Department };
type DeleteDepartmentResponse = { deleteDepartment: DeleteResult };

type CreateDepartmentRequest = { department: CreateDepartmentInput };
type UpdateDepartmentRequest = { department: UpdateDepartmentInput };
type DeleteDepartmentRequest = { department: DeleteDepartmentInput };

export type {
  Department,
  DepartmentsResponse,
  CreateDepartmentResponse,
  UpdateDepartmentResponse,
  DeleteDepartmentResponse,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
  DeleteDepartmentRequest,
};
