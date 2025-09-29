"use server";

import { CREATE_CV } from "@/shared/graphql/cvs/cvs.mutations";
import { GET_CV, GET_CVS } from "@/shared/graphql/cvs/cvs.queries";
import {
  CreateCvRequest,
  CreateCvResponse,
} from "@/shared/graphql/cvs/cvs.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const createCv = async (cv: CreateCvRequest["cv"]) => {
  const { error } = await getClient().mutate<CreateCvResponse, CreateCvRequest>(
    {
      mutation: CREATE_CV,
      variables: { cv },
      refetchQueries: [GET_CVS, GET_CV],
    }
  );

  if (error) {
    throw error;
  }
};