import { LoginForm } from "@/features/login-form";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Login",
  description: "Sign in to access your account on CV Platform.",
  keywords: ["login", "sign in", "authentication", "CV Platform"],
};

const LoginPage = async () => {
  const t = await getTranslations("auth.login");
  return (
    <div className="flex flex-col w-full justify-center items-center px-4">
      <h1 className="text-4xl text-center mb-6">{t("title")}</h1>
      <p className="leading-1.5 text-center mb-10">{t("subtitle")}</p>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
