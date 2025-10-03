"use server";

import { DELETE_CV } from "@/shared/graphql/cvs/cvs.mutations";
import { GET_CVS } from "@/shared/graphql/cvs/cvs.queries";
import {
  DeleteCvRequest,
  DeleteCvResponse,
} from "@/shared/graphql/cvs/cvs.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export async function deleteCv(cv: DeleteCvRequest["cv"]) {
  const { error } = await getClient().mutate<DeleteCvResponse, DeleteCvRequest>(
    {
      mutation: DELETE_CV,
      variables: { cv },
      refetchQueries: [GET_CVS],
    }
  );

  if (error) {
    throw error;
  }
}