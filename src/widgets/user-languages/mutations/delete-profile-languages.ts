import { DELETE_PROFILE_LANGUAGE } from "@/shared/graphql/profile/profile.mutations";
import {
  DeleteProfileLanguageRequest,
  DeleteProfileLanguageResponse,
} from "@/shared/graphql/profile/profile.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const deleteProfileLanguages = (
  language: DeleteProfileLanguageRequest["language"]
) => {
  getClient().mutate<
    DeleteProfileLanguageResponse,
    DeleteProfileLanguageRequest
  >({
    mutation: DELETE_PROFILE_LANGUAGE,
    variables: { language },
  });
};
