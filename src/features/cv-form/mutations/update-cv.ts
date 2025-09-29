"use server";

import { UPDATE_CV } from "@/shared/graphql/cvs/cvs.mutations";
import { GET_CV, GET_CVS } from "@/shared/graphql/cvs/cvs.queries";
import {
  UpdateCvRequest,
  UpdateCvResponse,
} from "@/shared/graphql/cvs/cvs.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const updateCv = async (cv: UpdateCvRequest["cv"]) => {
  const { error } = await getClient().mutate<UpdateCvResponse, UpdateCvRequest>(
    {
      mutation: UPDATE_CV,
      variables: { cv },
      refetchQueries: [GET_CVS, GET_CV],
    }
  );

  if (error) {
    throw error;
  }
};