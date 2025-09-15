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

  const [signupMutation, { loading, error }] = useMutation<SignupResponse, AuthRequest>(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      const signup = data?.signup;

      const access = signup?.access_token;
      const refresh = signup?.refresh_token;
      const userId = signup?.user?.id;
      if (!access || !refresh || !userId) {
        toast.error("Invalid signup response");
        return;
      }

      setTokens({ access_token: access, refresh_token: refresh });
      localStorage.setItem("user_id", String(userId));

      client
        .resetStore()
        .catch(() => {})
        .finally(() => {
          router.replace("/");
        });
    },
    onError: (e) => {
      const message = e instanceof Error ? e.message : String(e);
      toast.error(message || "Network error. Try it later");
    },
  });

  const signupUser = (authData: AuthRequest["auth"]) => signupMutation({ variables: { auth: authData } });

  return { signupUser, loading, error };
};
