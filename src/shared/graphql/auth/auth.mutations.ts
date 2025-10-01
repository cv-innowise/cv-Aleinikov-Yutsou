import { gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      access_token
      refresh_token
      user {
        id
        email
      }
    }
  }
`;

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($auth: ForgotPasswordInput!) {
    forgotPassword(auth: $auth)
  }
`;

export { SIGNUP_MUTATION, FORGOT_PASSWORD_MUTATION };
