import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      email
      profile {
        created_at
        full_name
        first_name
        last_name
        avatar
      }
      department_name
      position_name
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      email
      profile {
        created_at
        full_name
        first_name
        last_name
        avatar
      }
      department_name
      position_name
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      affected
    }
  }
`;