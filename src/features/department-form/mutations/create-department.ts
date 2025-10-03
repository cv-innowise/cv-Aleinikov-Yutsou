"use server";

import { CREATE_DEPARTMENT } from "@/shared/graphql/departments/departments.mutations";
import { GET_DEPARTMENTS } from "@/shared/graphql/departments/departments.queries";
import {
  CreateDepartmentRequest,
  CreateDepartmentResponse,
} from "@/shared/graphql/departments/departments.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const createDepartment = async (
  department: CreateDepartmentRequest["department"]
) => {
  const { error } = await getClient().mutate<CreateDepartmentResponse, CreateDepartmentRequest>({
    mutation: CREATE_DEPARTMENT,
    variables: { department },
    refetchQueries: [GET_DEPARTMENTS],
  });
  
  if (error) {
    throw error;
  }
};