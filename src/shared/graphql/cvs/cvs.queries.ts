import { gql } from "@apollo/client";

export const GET_CVS = gql`
  query GetCvs {
    cvs {
      id
      name
      description
      user {
        id
        email
      }
    }
  }
`;

export const GET_CV = gql`
  query GetCv($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      user {
        id
        email
        position_name
        department {
          name
        }
        profile {
          full_name
          languages {
            name
            proficiency
          }
        }
      }
      projects {
        id
        name
        domain
        start_date
        end_date
        description
        environment
        responsibilities
        roles
        project {
          id
        }
      }
      skills {
        name
        mastery
        categoryId
      }
      languages {
        name
        proficiency
      }
    }
  }
`;
