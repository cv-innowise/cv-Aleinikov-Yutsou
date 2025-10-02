"use client";

import { useForm } from "react-hook-form";
import { InferType } from "yup";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordInput } from "cv-graphql";
import { forgotPasswordSchema } from "../validation/forgot-password.schema";
import { useForgotPassword } from "../lib/use-forgot-password";

type FormValues = InferType<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
  const form = useForm<FormValues>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const { forgotPassword, loading } = useForgotPassword();

  const onSubmit = (auth: ForgotPasswordInput) => {
    forgotPassword({ variables: { auth } });
  };

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg w-full">
        <div className="mb-14">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button loading={loading} type="submit">
            Send Reset Link
          </Button>
          <Button asChild variant="link" type="button">
            <Link href="/login">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};
