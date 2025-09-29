import { useSuspenseQuery } from "@apollo/client/react";
import { GET_DEPARTMENTS } from "@/shared/graphql/departments/departments.queries";
import { Department, DepartmentsResponse } from "@/shared/graphql/departments/departments.types";

export const useGetDepartment = (departmentId?: Department["id"]) => {
  if (!departmentId) {
    return;
  }
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useSuspenseQuery<DepartmentsResponse>(GET_DEPARTMENTS);
  const department = data.departments.find((dep) => dep.id === departmentId)

  return department;
}