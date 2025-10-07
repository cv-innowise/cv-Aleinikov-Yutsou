"use server";

import { ADD_CV_PROJECT } from "@/shared/graphql/cvs/cvs.mutations";
import { AddCvProjectRequest, AddCvProjectResponse } from "@/shared/graphql/cvs/cvs.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";
import { AddCvProjectInput } from "@/shared/types/cv-graphql";

export const addCvProject = async (project: AddCvProjectInput) => {
  const { error } = await getClient().mutate<AddCvProjectResponse, AddCvProjectRequest>({
    mutation: ADD_CV_PROJECT,
    variables: { project },
    refetchQueries: [ADD_CV_PROJECT],
  });

  if (error) {
    throw error;
  }
};
