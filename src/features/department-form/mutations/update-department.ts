"use server";

import { UPDATE_DEPARTMENT } from "@/shared/graphql/departments/departments.mutations";
import { GET_DEPARTMENTS } from "@/shared/graphql/departments/departments.queries";
import {
  UpdateDepartmentRequest,
  UpdateDepartmentResponse,
} from "@/shared/graphql/departments/departments.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const updateDepartment = async (
  department: UpdateDepartmentRequest["department"]
) => {
  const { error } = await getClient().mutate<
    UpdateDepartmentResponse,
    UpdateDepartmentRequest
  >({
    mutation: UPDATE_DEPARTMENT,
    variables: { department },
    refetchQueries: [GET_DEPARTMENTS],
  });

  if (error) {
    throw error;
  }
};
