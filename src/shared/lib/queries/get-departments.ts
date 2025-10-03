import { GET_DEPARTMENTS } from "@/shared/graphql/departments/departments.queries";
import {
  Department,
  DepartmentsResponse,
} from "@/shared/graphql/departments/departments.types";
import { query } from "../apollo/apollo-client";

export const getDepartments = async (): Promise<Department[]> => {
  const { data } = await query<DepartmentsResponse>({ query: GET_DEPARTMENTS });

  return data?.departments ?? [];
};