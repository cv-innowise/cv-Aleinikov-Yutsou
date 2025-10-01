import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      profile {
        first_name
        last_name
        avatar
      }
      department_name
      position_name
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      id
      email
      profile {
        created_at
        full_name
        first_name
        last_name
        avatar
      }
      department {
        id
      }
      department_name
      position {
        id
      }
      cvs {
        id
        name
      }
      position_name
      role
    }
  }
`;
const USER_BY_ID = gql`
  query QetUserById($userId: ID!) {
    user(userId: $userId) {
      id
      email
      is_verified
      role
      profile {
        avatar
        full_name
      }
    }
  }
`;

export { USER_BY_ID };
