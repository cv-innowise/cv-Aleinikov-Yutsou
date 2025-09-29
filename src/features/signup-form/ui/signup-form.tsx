"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../validation/signup.schema";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { useSignup } from "../lib/use-signup";
import { PasswordField } from "@/shared/components/ui/password-field";
import { InferType } from "yup";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shared/components/ui/form";
import { useTranslations } from "next-intl";

type FormValues = InferType<typeof signupSchema>;

export const SignupForm = () => {
  const t = useTranslations("auth.signup");

  const form = useForm<FormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: { email: "", password: "" },
  });

  const { signupUser, loading } = useSignup();

  return (
    <Form {...form}>
      <form className="max-w-lg w-full" noValidate onSubmit={form.handleSubmit(signupUser)}>
        <div className="space-y-5 mb-14">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder={t("emailPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordField placeholder={t("passwordPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid justify-items-center gap-2">
          <Button loading={loading} type="submit">
            {t("submit")}
          </Button>
          <Button asChild variant="link">
            <Link href="/login">{t("haveAccount")}</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};
