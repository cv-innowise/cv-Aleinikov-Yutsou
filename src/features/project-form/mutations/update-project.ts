"use server";

import { UPDATE_PROJECT } from "@/shared/graphql/projects/projects.mutations";
import {
  GET_PROJECT,
  GET_PROJECTS,
} from "@/shared/graphql/projects/projects.queries";
import {
  UpdateProjectRequest,
  UpdateProjectResponse,
} from "@/shared/graphql/projects/projects.types";
import { getClient } from '@/shared/lib/apollo/apollo-client';

export const updateProject = async (project: UpdateProjectRequest["project"]) => {
  const { error } = await getClient().mutate<UpdateProjectResponse, UpdateProjectRequest>({
    mutation: UPDATE_PROJECT,
    variables: { project },
    refetchQueries: [GET_PROJECT, GET_PROJECTS],
  });

  if (error) {
    throw error;
  }
};