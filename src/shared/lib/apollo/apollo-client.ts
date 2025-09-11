import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
});

const authLink = new ApolloLink((operation, forward) => {
  const isUpdateToken = operation.operationName === "UpdateToken";

  const token = localStorage.getItem(isUpdateToken ? "refresh_token" : "access_token");
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
