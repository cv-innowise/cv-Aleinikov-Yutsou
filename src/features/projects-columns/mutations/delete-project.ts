"use server";

import { DELETE_PROJECT } from "@/shared/graphql/projects/projects.mutations";
import { GET_PROJECTS } from "@/shared/graphql/projects/projects.queries";
import {
  DeleteProjectRequest,
  DeleteProjectResponse,
} from "@/shared/graphql/projects/projects.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const deleteProject = async (
  project: DeleteProjectRequest["project"]
) => {
  const { error } = await getClient().mutate<
    DeleteProjectResponse,
    DeleteProjectRequest
  >({
    mutation: DELETE_PROJECT,
    variables: { project },
    refetchQueries: [GET_PROJECTS],
  });

  if (error) {
    throw error;
  }
};
