import { UPDATE_PROFILE_LANGUAGE } from "@/shared/graphql/profile/profile.mutations";
import {
  UpdateProfileLanguageRequest,
  UpdateProfileLanguageResponse,
} from "@/shared/graphql/profile/profile.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const updateProfileLanguage = (
  language: UpdateProfileLanguageRequest["language"]
) => {
  getClient().mutate<
    UpdateProfileLanguageResponse,
    UpdateProfileLanguageRequest
  >({
    mutation: UPDATE_PROFILE_LANGUAGE,
    variables: { language },
  });
};
