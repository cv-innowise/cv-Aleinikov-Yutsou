"use server";

import { CREATE_LANGUAGE } from "@/shared/graphql/languages/languages.mutations";
import { GET_LANGUAGES } from "@/shared/graphql/languages/languages.queries";
import {
  CreateLanguageRequest,
  CreateLanguageResponse,
} from "@/shared/graphql/languages/languages.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const createLanguage = async (
  language: CreateLanguageRequest["language"]
) => {
  const { error } = await getClient().mutate<
    CreateLanguageResponse,
    CreateLanguageRequest
  >({
    mutation: CREATE_LANGUAGE,
    variables: { language },
    refetchQueries: [GET_LANGUAGES],
  });

  if (error) {
    throw error;
  }
};
