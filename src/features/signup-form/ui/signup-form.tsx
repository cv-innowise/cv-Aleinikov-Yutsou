"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../validation/signup.validation";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { useSignup } from "../lib/use-signup";

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const { signupUser, loading } = useSignup();

  return (
    <form className="max-w-lg w-full" onSubmit={handleSubmit(signupUser)}>
      <div className="space-y-5 mb-14">
        <div>
          <Input {...register("email")} type="email" placeholder="Email" />
          {errors.email && <span className="text-destructive text-sm">{errors.email.message}</span>}
        </div>
        <div>
          <Input {...register("password")} type="password" placeholder="Password" />
          {errors.password && <span className="text-destructive text-sm">{errors.password.message}</span>}
        </div>
      </div>
      <div className="grid justify-items-center gap-2">
        <Button loading={loading} type="submit">
          Create accoutn
        </Button>
        <Button asChild variant="link">
          <Link href="/login">I have an accout</Link>
        </Button>
      </div>
    </form>
  );
};
