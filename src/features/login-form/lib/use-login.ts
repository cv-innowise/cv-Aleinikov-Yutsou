"use client";

import { useLazyQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LOGIN_QUERY } from "@/shared/graphql/auth/auth.queries";
import type { LoginResponse, AuthRequest } from "@/shared/graphql/auth/auth.types";
import { successAuth } from "@/features/auth";

export const useLogin = () => {
  const router = useRouter();

  const [loginQuery, { loading, error }] = useLazyQuery<LoginResponse, AuthRequest>(LOGIN_QUERY, {
    fetchPolicy: "no-cache",
  });

  const loginUser = (authData: AuthRequest["auth"]) =>
    loginQuery({ variables: { auth: authData } })
      .then(({ data }) => {
        if (data?.login) {
          successAuth(data.login);
          router.push("/users");
        }
      })
      .catch((e) => {
        const message = e instanceof Error ? e.message : String(e);
        toast.error(message || "Network error. Try it later");
      });

  return { loginUser, loading, error };
};
