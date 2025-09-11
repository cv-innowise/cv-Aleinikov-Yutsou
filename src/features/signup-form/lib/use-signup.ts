import { useMutation } from "@apollo/client/react";
import { SignupResponse, AuthRequest } from "@/shared/graphql/auth/auth.types";
import { SIGNUP_MUTATION } from "@/shared/graphql/auth/auth.mutations";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSignup = () => {
  const router = useRouter();
  const [signupMutation, { loading, error }] = useMutation<SignupResponse, AuthRequest>(SIGNUP_MUTATION);

  const signupUser = async (authData: AuthRequest["auth"]) => {
    try {
      const { data: res } = await signupMutation({ variables: { auth: authData } });

      if (res?.signup?.access_token) {
        localStorage.setItem("access_token", res.signup.access_token);
        localStorage.setItem("refresh_token", res.signup.refresh_token);
        localStorage.setItem("user_id", res.signup.user.id);
        router.push("/");
        return true;
      }

      const message = error?.message || "Something went wrong. Try it later";
      toast.error(message);
      return false;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      toast.error(message || "Network error. Try it later");
      return false;
    }
  };

  return { signupUser, loading, error };
};
