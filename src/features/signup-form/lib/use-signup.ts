"use client";

import { useMutation, useApolloClient } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SIGNUP_MUTATION } from "@/shared/graphql/auth/auth.mutations";
import type { SignupResponse, AuthRequest } from "@/shared/graphql/auth/auth.types";
import { setTokens } from "@/shared/auth";

export const useSignup = () => {
  const router = useRouter();
  const client = useApolloClient();

  const [signupMutation, { loading, error }] = useMutation<SignupResponse, AuthRequest>(SIGNUP_MUTATION);

  const signupUser = (authData: AuthRequest["auth"]) =>
    signupMutation({ variables: { auth: authData } })
      .then(({ data }) => {
        const tokens = data?.signup.access_token && data.signup.refresh_token ? { access_token: data.signup.access_token, refresh_token: data.signup.refresh_token } : undefined;
        if (tokens) {
          setTokens(tokens);
        }

        const userId = data?.signup?.user?.id;
        if (userId) {
          localStorage.setItem("user_id", String(userId));
        }

        return client
          .resetStore()
          .catch(() => {})
          .finally(() => {
            router.replace("/");
          });
      })
      .catch((e) => {
        const message = e instanceof Error ? e.message : String(e);
        toast.error(message || "Network error. Try it later");
      });

  return { signupUser, loading, error };
};
