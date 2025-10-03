import { gql } from "@apollo/client";

export const CREATE_LANGUAGE = gql`
  mutation CreateLanguage($language: CreateLanguageInput!) {
    createLanguage(language: $language) {
      id
      name
      native_name
      iso2
    }
  }
`;

export const UPDATE_LANGUAGE = gql`
  mutation UpdateLanguage($language: UpdateLanguageInput!) {
    updateLanguage(language: $language) {
      id
      name
      native_name
      iso2
    }
  }
`;

export const DELETE_LANGUAGE = gql`
  mutation DeleteLanguage($language: DeleteLanguageInput!) {
    deleteLanguage(language: $language) {
      affected
    }
  }
`;
