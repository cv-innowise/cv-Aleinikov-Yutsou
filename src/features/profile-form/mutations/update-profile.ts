"use server";

import { UPDATE_PROFILE } from "@/shared/graphql/profile/profile.mutations";
import { GET_PROFILE } from "@/shared/graphql/profile/profile.queries";
import { UpdateProfileRequest } from "@/shared/graphql/profile/profile.types";
import { GET_USER, GET_USERS } from "@/shared/graphql/users/users.queries";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const updateProfile = async (
  profile: UpdateProfileRequest["profile"]
) => {
  const { error } = await getClient().mutate({
    mutation: UPDATE_PROFILE,
    variables: { profile },
    refetchQueries: [GET_PROFILE, GET_USERS, GET_USER],
  });

  if (error) {
    throw error;
  }
};
