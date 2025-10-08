"use server";

import { REMOVE_CV_PROJECT } from "@/shared/graphql/cvs/cvs.mutations";
import { RemoveCvProjectRequest, RemoveCvProjectResponse } from "@/shared/graphql/cvs/cvs.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";
import { RemoveCvProjectInput } from "@/shared/types/cv-graphql";

export const deleteCvProject = async (project: RemoveCvProjectInput) => {
  const { error } = await getClient().mutate<RemoveCvProjectResponse, RemoveCvProjectRequest>({
    mutation: REMOVE_CV_PROJECT,
    variables: { project },
  });
  if (error) {
    throw error;
  }
};
