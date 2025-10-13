"use server";

import { UPDATE_CV_PROJECT } from "@/shared/graphql/cvs/cvs.mutations";
import { UpdateCvProjectRequest, UpdateCvProjectResponse } from "@/shared/graphql/cvs/cvs.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";
import { UpdateCvProjectInput } from "@/shared/types/cv-graphql";

export const updateCvProject = async (project: UpdateCvProjectInput) => {
  const { error } = await getClient().mutate<UpdateCvProjectResponse, UpdateCvProjectRequest>({
    mutation: UPDATE_CV_PROJECT,
    variables: { project },
    refetchQueries: [UPDATE_CV_PROJECT],
  });
  if (error) {
    throw error;
  }
};
