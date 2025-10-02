import { gql } from "@apollo/client"

export const GET_LANGUAGES = gql`
  query GetLanguages {
    languages {
      id
      name
      native_name
      iso2
    }
  }
`;