import { gql } from "@apollo/client";

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
