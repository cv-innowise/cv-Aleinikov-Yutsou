"use client";

import { ApolloLink } from "@apollo/client";
import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import React from "react";
import { clientAuthLink, errorLink, httpLink } from "../lib/apollo/links";

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([clientAuthLink, errorLink, httpLink]),
  });
}

export const ApolloWrapper = ({ children }: React.PropsWithChildren) => {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
};
