"use client";

import { useLazyQuery, useApolloClient } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LOGIN_QUERY } from "@/shared/graphql/auth/auth.queries";
import type { LoginResponse, AuthRequest } from "@/shared/graphql/auth/auth.types";
import { setTokens } from "@/shared/lib/cookies";
// import { setTokens } from "@/shared/auth";

export const useLogin = () => {
  const router = useRouter();
  const client = useApolloClient();

  const [loginQuery, { loading, error }] = useLazyQuery<LoginResponse, AuthRequest>(LOGIN_QUERY, {
    fetchPolicy: "no-cache",
  });

  const loginUser = (authData: AuthRequest["auth"]) =>
    loginQuery({ variables: { auth: authData } })
      .then(({ data }) => {
        const accessToken = data?.login?.access_token;
        const refreshToken = data?.login?.refresh_token;

        if (accessToken && refreshToken) {
          setTokens(accessToken, refreshToken);
        }

        const userId = data?.login?.user?.id;
        if (userId) {
          localStorage.setItem("user_id", String(userId));
        }

        toast.success("Login successful");
      })
      .catch((e) => {
        const message = e instanceof Error ? e.message : String(e);
        toast.error(message || "Network error. Try it later");
      });

  return { loginUser, loading, error };
};
