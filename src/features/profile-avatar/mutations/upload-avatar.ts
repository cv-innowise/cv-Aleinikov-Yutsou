"use server";

import { UPLOAD_AVATAR } from "@/shared/graphql/profile/profile.mutations";
import { GET_PROFILE } from "@/shared/graphql/profile/profile.queries";
import {
  UploadAvatarRequest,
  UploadAvatarResponse,
} from "@/shared/graphql/profile/profile.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const uploadAvatar = async (avatar: UploadAvatarRequest["avatar"]) => {
  const { error } = await getClient().mutate<
    UploadAvatarResponse,
    UploadAvatarRequest
  >({
    mutation: UPLOAD_AVATAR,
    variables: { avatar },
    refetchQueries: [
      { query: GET_PROFILE, variables: { userId: avatar.userId } },
    ],
  });

  if (error) {
    throw error;
  }
};
