import { SIGNUP_MUTATION } from "@/shared/graphql/auth/auth.mutations";

export const signupMock = {
  request: {
    query: SIGNUP_MUTATION,
    variables: { auth: { email: "new@mail.com", password: "passworD123" } },
  },
  result: {
    data: {
      signup: {
        access_token: "mock_access_token",
        refresh_token: "mock_refresh_token",
        user: {
          id: "2",
          email: "new@mail.com",
        },
      },
    },
  },
};
