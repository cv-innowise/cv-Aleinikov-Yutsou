import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      internal_name
      domain
      start_date
      end_date
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($projectId: ID!) {
    project(projectId: $projectId) {
      id
      name
      domain
      start_date
      end_date
      description
      environment
    }
  }
`;
