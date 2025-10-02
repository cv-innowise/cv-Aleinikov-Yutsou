import { ADD_PROFILE_LANGUAGE } from "@/shared/graphql/profile/profile.mutations";
import {
  AddProfileLanguageRequest,
  AddProfileLanguageResponse,
} from "@/shared/graphql/profile/profile.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const addProfileLanguage = (
  language: AddProfileLanguageRequest["language"]
) => {
  getClient().mutate<AddProfileLanguageResponse, AddProfileLanguageRequest>({
    mutation: ADD_PROFILE_LANGUAGE,
    variables: { language },
  });
};