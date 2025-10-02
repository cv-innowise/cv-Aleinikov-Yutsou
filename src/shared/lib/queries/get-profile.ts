import { GET_PROFILE } from "@/shared/graphql/profile/profile.queries";
import {
  Profile,
  ProfileRequest,
  ProfileResponse,
} from "@/shared/graphql/profile/profile.types";
import { User } from "@/shared/graphql/users/users.types";
import { query } from "../apollo/apollo-client";

export const getProfile = async (
  userId: User["id"]
): Promise<Profile | undefined> => {
  const res = await query<ProfileResponse, ProfileRequest>({
    query: GET_PROFILE,
    variables: { userId },
  }).catch(()=> {});

  return res?.data?.profile;
};
