"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation/register.validation";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { useSignup } from "../lib/useRegister";

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { signupUser, loading } = useSignup();

  return (
    <form className={cn("max-w-[35rem] w-full")} onSubmit={handleSubmit(signupUser)}>
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
          Create accoutn
        </Button>
        <Button asChild variant="link">
          <Link href="/login">I have an accout</Link>
        </Button>
      </div>
    </form>
  );
};
