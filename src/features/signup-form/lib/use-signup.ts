"use client";

import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SIGNUP_MUTATION, SignupResponse, AuthRequest } from "@/shared/graphql/auth";
import { successAuth } from "@/features/auth";

export const useSignup = () => {
  const router = useRouter();

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

      successAuth(signup);

      router.push(`/users/${signup.user.id}/profile`);
    },
    onError: (e) => {
      const message = e instanceof Error ? e.message : String(e);
      toast.error(message || "Network error. Try it later");
    },
  });

  const signupUser = (authData: AuthRequest["auth"]) => signupMutation({ variables: { auth: authData } });

  return { signupUser, loading, error };
};
