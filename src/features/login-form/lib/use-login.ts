import { useLazyQuery } from "@apollo/client/react";
import { LoginResponse, AuthRequest } from "@/shared/graphql/auth/auth.types";
import { LOGIN_QUERY } from "@/shared/graphql/auth/auth.queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const [loginQuery, { loading, error }] = useLazyQuery<LoginResponse, AuthRequest>(LOGIN_QUERY);

  const loginUser = (authData: AuthRequest["auth"]) =>
    loginQuery({ variables: { auth: authData } })
      .then(({ data }) => {
        if (data?.login?.access_token) {
          localStorage.setItem("access_token", data.login.access_token);
          localStorage.setItem("refresh_token", data.login.refresh_token);
          localStorage.setItem("user_id", data.login.user.id);
          router.push("/");
          return;
        }

        toast.error("Something went wrong. Try it later");
        return;
      })
      .catch((e: unknown) => {
        const message = e instanceof Error ? e.message : String(e);
        toast.error(message || "Network error. Try it later");
        return;
      });

  return { loginUser, loading, error };
};
