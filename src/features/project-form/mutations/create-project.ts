"use server";

import { CREATE_PROJECT } from "@/shared/graphql/projects/projects.mutations";
import { GET_PROJECTS } from "@/shared/graphql/projects/projects.queries";
import {
  CreateProjectRequest,
  CreateProjectResponse,
} from "@/shared/graphql/projects/projects.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const createProject = async (
  project: CreateProjectRequest["project"]
) => {
  const { error } = await getClient().mutate<
    CreateProjectResponse,
    CreateProjectRequest
  >({
    mutation: CREATE_PROJECT,
    variables: { project },
    refetchQueries: [GET_PROJECTS],
  });

  if (error) {
    throw error;
  }
};
