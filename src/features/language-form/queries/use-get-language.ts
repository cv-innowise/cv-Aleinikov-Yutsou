import { useSuspenseQuery } from "@apollo/client/react";
import { Language, LanguagesResponse } from "@/shared/graphql/languages/languages.types";
import { GET_LANGUAGES } from "@/shared/graphql/languages/languages.queries";

export const useGetLanguage = (languageId?: Language["id"]) => {
  if (!languageId) {
    return;
  }
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useSuspenseQuery<LanguagesResponse>(GET_LANGUAGES);
  const language = data.languages.find((lang) => lang.id === languageId);

  return language;
}