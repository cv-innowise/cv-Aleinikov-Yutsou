"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { InferType } from "yup";
import { loginSchema } from "../validation/login.schema";
import { useLogin } from "../lib/use-login";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { PasswordField } from "@/shared/components/ui/password-field";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/shared/components/ui/form";
import { useTranslations } from "next-intl";

type FormValues = InferType<typeof loginSchema>;

export const LoginForm = () => {
  const t = useTranslations("auth.login");

  const form = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { loginUser, loading } = useLogin();

  return (
    <Form {...form}>
      <form className="max-w-lg w-full" noValidate onSubmit={form.handleSubmit(loginUser)}>
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
            <Link href="/forgot-password">{t("forgotPassword")}</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};
