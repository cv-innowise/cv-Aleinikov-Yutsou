"use client";

import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/shared/lib/apollo/apollo-client";

export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
