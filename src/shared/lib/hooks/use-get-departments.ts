import { GET_DEPARTMENTS } from "@/shared/graphql/departments/departments.queries";
import {
  Department,
  DepartmentsResponse,
} from "@/shared/graphql/departments/departments.types";
import { useSuspenseQuery } from "@apollo/client/react";

export const useGetDepartments = (): Department[] => {
  const { data } = useSuspenseQuery<DepartmentsResponse>(GET_DEPARTMENTS);

  return data.departments;
};
