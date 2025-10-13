"use server";

import { DELETE_AVATAR } from "@/shared/graphql/profile/profile.mutations";
import { GET_PROFILE } from "@/shared/graphql/profile/profile.queries";
import {
  DeleteAvatarRequest,
  DeleteAvatarResponse,
} from "@/shared/graphql/profile/profile.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const deleteAvatar = async (avatar: DeleteAvatarRequest["avatar"]) => {
  const { error } = await getClient().mutate<
    DeleteAvatarResponse,
    DeleteAvatarRequest
  >({
    mutation: DELETE_AVATAR,
    variables: { avatar },
    refetchQueries: [
      { query: GET_PROFILE, variables: { userId: avatar.userId } },
    ],
  });

  if (error) {
    throw error;
  }
};
