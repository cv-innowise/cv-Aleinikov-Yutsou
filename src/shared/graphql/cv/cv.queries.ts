import { gql } from "@apollo/client";

const CV_QUERY = gql`
  query GetCvById($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      created_at
      name
      education
    }
  }
`;

export { CV_QUERY };
