"use server";

import { DELETE_USER } from "@/shared/graphql/users/users.mutations";
import { GET_USERS } from "@/shared/graphql/users/users.queries";
import {
  DeleteUserRequest,
  DeleteUserResponse,
} from "@/shared/graphql/users/users.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const deleteUser = async (userId: DeleteUserRequest) => {
  const { error } = await getClient().mutate<
    DeleteUserResponse,
    DeleteUserRequest
  >({
    mutation: DELETE_USER,
    variables: userId,
    refetchQueries: [GET_USERS],
  });

  if (error) {
    throw error;
  }
};