import { FORGOT_PASSWORD_MUTATION } from "@/shared/graphql/auth/auth.mutations";
import { ForgotPasswordResponse, ForgotPasswordRequest } from "@/shared/graphql/auth/auth.types";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useForgotPassword() {
  const router = useRouter();
  const [forgotPassword, { loading }] = useMutation<ForgotPasswordResponse, ForgotPasswordRequest>(FORGOT_PASSWORD_MUTATION, {
    onCompleted: () => {
      toast.success("A reset link has been sent to your email.");
      router.push("/login");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || "Something went wrong. Please try again.");
    },
  });

  return { forgotPassword, loading };
}
