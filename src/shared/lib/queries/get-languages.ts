import { GET_LANGUAGES } from "@/shared/graphql/languages/languages.queries";
import {
  Language,
  LanguagesResponse,
} from "@/shared/graphql/languages/languages.types";
import { query } from "../apollo/apollo-client";

export const getLanguages = async (): Promise<Language[]> => {
  const { data } = await query<LanguagesResponse>({ query: GET_LANGUAGES });

  return data?.languages ?? [];
};
