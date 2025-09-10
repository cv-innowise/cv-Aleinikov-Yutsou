"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/login.validation";
import { useLogin } from "../lib/useLogin";
import { LoginArgs } from "../types";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

export const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [login, { data, loading, error }] = useLogin();

  const onSubmit = async (data: LoginArgs["auth"]) => {
    const res = await login({ variables: { auth: data } });
    if (res.data?.login.access_token) {
      localStorage.setItem("access_token", res.data.login.access_token);
      localStorage.setItem("refresh_token", res.data.login.refresh_token);
      localStorage.setItem("user_id", res.data.login.user.id);
      router.push("/");
    }
  };

  return (
    <form className={cn("max-w-[35rem] w-full")} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 mb-14">
        <div>
          <Input {...register("email")} type="email" placeholder="Email" />
          {errors.email && <span className="text-destructive text-sm">{errors.email.message}</span>}
        </div>
        <div>
          <Input {...register("password")} type="password" placeholder="Password" />
          {errors.password && <span className="text-destructive text-sm">{errors.password.message}</span>}
        </div>
      </div>
      <div className={cn("grid justify-items-center gap-2")}>
        <Button loading={loading} variant="default" type="submit">
          Log in
        </Button>
        <Button asChild variant="link">
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </form>
  );
};
