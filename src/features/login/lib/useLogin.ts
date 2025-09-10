import { useLazyQuery } from "@apollo/client/react";
import { LoginResult, AuthArgs } from "@/shared/graphql/auth/auth.types";
import { LOGIN_QUERY } from "@/shared/graphql/auth/auth.queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const [loginQuery, { loading, error }] = useLazyQuery<LoginResult, AuthArgs>(LOGIN_QUERY);

  const loginUser = async (authData: AuthArgs["auth"]) => {
    try {
      const { data: res } = await loginQuery({ variables: { auth: authData } });

      if (res?.login?.access_token) {
        localStorage.setItem("access_token", res.login.access_token);
        localStorage.setItem("refresh_token", res.login.refresh_token);
        localStorage.setItem("user_id", res.login.user.id);
        router.push("/");
        return true;
      }

      const message = error?.message || "Something went wrong. Try it later";
      toast.error(message);
      return false;
    } catch (e: any) {
      toast.error(e?.message || "Network error. Try it later");
      return false;
    }
  };

  return { loginUser, loading, error };
};
