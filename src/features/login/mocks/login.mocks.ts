import { LOGIN_QUERY } from "@/shared/graphql/auth.gql";

export const loginMock = {
  request: {
    query: LOGIN_QUERY,
    variables: { auth: { email: "test@mail.com", password: "123456" } },
  },
  result: {
    data: {
      login: {
        access_token: "mock_access_token",
        refresh_token: "mock_refresh_token",
        user: {
          id: "1",
          email: "test@mail.com",
        },
      },
    },
  },
};
