"use server";

import { DELETE_DEPARTMENT } from "@/shared/graphql/departments/departments.mutations";
import { GET_DEPARTMENTS } from "@/shared/graphql/departments/departments.queries";
import {
  DeleteDepartmentRequest,
  DeleteDepartmentResponse,
} from "@/shared/graphql/departments/departments.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const deleteDepartment = async (
  department: DeleteDepartmentRequest["department"]
) => {
  const { error } = await getClient().mutate<DeleteDepartmentResponse, DeleteDepartmentRequest>({
    mutation: DELETE_DEPARTMENT,
    variables: { department },
    refetchQueries: [GET_DEPARTMENTS],
  });
  
  if (error) {
    throw error;
  }
};