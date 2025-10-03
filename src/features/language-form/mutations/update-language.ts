"use server";

import { UPDATE_LANGUAGE } from "@/shared/graphql/languages/languages.mutations";
import { GET_LANGUAGES } from "@/shared/graphql/languages/languages.queries";
import {
  UpdateLanguageRequest,
  UpdateLanguageResponse,
} from "@/shared/graphql/languages/languages.types";
import { getClient } from '@/shared/lib/apollo/apollo-client';

export const updateLanguage = async (language: UpdateLanguageRequest["language"]) => {
  const { error } = await getClient().mutate<UpdateLanguageResponse, UpdateLanguageRequest>({
    mutation: UPDATE_LANGUAGE,
    variables: { language },
    refetchQueries: [GET_LANGUAGES],
  });
  
  if (error) {
    throw error;
  }
};
