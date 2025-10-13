"use server";

import { UPDATE_USER } from "@/shared/graphql/users/users.mutations";
import { GET_USER, GET_USERS } from "@/shared/graphql/users/users.queries";
import {
  UpdateUserRequest,
  UpdateUserResponse,
} from "@/shared/graphql/users/users.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const updateUser = async (
  user: Omit<UpdateUserRequest["user"], "cvsIds" | "role">
) => {
  const { error } = await getClient().mutate<
    UpdateUserResponse,
    UpdateUserRequest
  >({
    mutation: UPDATE_USER,
    variables: { user },
    refetchQueries: [
      { query: GET_USER, variables: { userId: user.userId } },
      GET_USERS,
    ],
  });

  if (error) {
    throw error;
  }
};
