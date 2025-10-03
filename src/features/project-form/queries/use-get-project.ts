import { GET_PROJECT } from "@/shared/graphql/projects/projects.queries";
import {
  Project,
  ProjectRequest,
  ProjectResponse,
} from "@/shared/graphql/projects/projects.types";
import { useSuspenseQuery } from "@apollo/client/react";

export const useGetProject = (projectId?: Project["id"]) => {
  if (!projectId) {
    return;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useSuspenseQuery<ProjectResponse, ProjectRequest>(
    GET_PROJECT,
    {
      variables: { projectId },
    }
  );
  const project = {
    ...data.project,
    start_date: new Date(data.project.start_date),
    end_date: new Date(data.project.end_date || "")
  }

  return project;
};
