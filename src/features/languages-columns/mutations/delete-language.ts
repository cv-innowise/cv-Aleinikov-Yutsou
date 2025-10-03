"use server";

import { DELETE_LANGUAGE } from "@/shared/graphql/languages/languages.mutations";
import { GET_LANGUAGES } from "@/shared/graphql/languages/languages.queries";
import {
  DeleteLanguageRequest,
  DeleteLanguageResponse,
} from "@/shared/graphql/languages/languages.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const deleteLanguage = async (
  language: DeleteLanguageRequest["language"]
) => {
  const { error } = await getClient().mutate<DeleteLanguageResponse, DeleteLanguageRequest>({
    mutation: DELETE_LANGUAGE,
    variables: { language },
    refetchQueries: [GET_LANGUAGES],
  });
  
  if (error) {
    throw error;
  }
};
