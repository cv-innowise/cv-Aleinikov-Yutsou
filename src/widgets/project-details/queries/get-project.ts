import { GET_PROJECT } from "@/shared/graphql/projects/projects.queries";
import {
  Project,
  ProjectRequest,
  ProjectResponse,
} from "@/shared/graphql/projects/projects.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const getProject = async (
  projectId: Project["id"]
): Promise<Project | undefined> => {
  const res = await getClient()
    .query<ProjectResponse, ProjectRequest>({
      query: GET_PROJECT,
      variables: { projectId },
    })
    .catch(() => {});

  return res?.data?.project;
};
