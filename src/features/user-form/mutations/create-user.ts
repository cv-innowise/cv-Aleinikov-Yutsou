"use server";

import { CREATE_USER } from "@/shared/graphql/users/users.mutations";
import { GET_USERS } from "@/shared/graphql/users/users.queries";
import {
  CreateUserRequest,
  CreateUserResponse,
} from "@/shared/graphql/users/users.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const createUser = async (user: CreateUserRequest["user"]) => {
  const { error } = await getClient().mutate<
    CreateUserResponse,
    CreateUserRequest
  >({
    mutation: CREATE_USER,
    variables: { user },
    refetchQueries: [GET_USERS],
  });

  if (error) {
    throw error;
  }
};