import { GET_PROJECTS } from "@/shared/graphql/projects/projects.queries";
import {
  ProjectItem,
  ProjectsResponse,
} from "@/shared/graphql/projects/projects.types";
import { query } from "@/shared/lib/apollo/apollo-client";

export const getProjects = async (): Promise<ProjectItem[]> => {
  const { data } = await query<ProjectsResponse>({ query: GET_PROJECTS });

  return data?.projects ?? [];
};
