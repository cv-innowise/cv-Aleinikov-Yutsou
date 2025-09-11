"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/login.schema";
import { useLogin } from "../lib/use-login";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { PasswordField } from "@/shared/components/ui/password-field";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { loginUser, loading } = useLogin();

  return (
    <form className="max-w-lg w-full" noValidate onSubmit={handleSubmit(loginUser)}>
      <div className="space-y-5 mb-14">
        <div>
          <Input {...register("email")} type="email" placeholder="Email" />
          {errors.email && <span className="text-destructive text-sm">{errors.email.message}</span>}
        </div>
        <div>
          <PasswordField {...register("password")} placeholder="Password" />
          {errors.password && <span className="text-destructive text-sm">{errors.password.message}</span>}
        </div>
      </div>
      <div className="grid justify-items-center gap-2">
        <Button loading={loading} type="submit">
          Log in
        </Button>
        <Button asChild variant="link">
          <Link href="/forgot-password">Forgot password</Link>
        </Button>
      </div>
    </form>
  );
};
