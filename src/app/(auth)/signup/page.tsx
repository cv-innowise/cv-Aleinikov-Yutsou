import { SignupForm } from "@/features/signup-form";
import { getTranslations } from "next-intl/server";

const SignupPage = async () => {
  const t = await getTranslations("auth.signup");
  return (
    <div className="flex flex-col w-full justify-center items-center px-4">
      <h1 className="text-4xl text-center mb-6">{t("title")}</h1>
      <p className="leading-1.5 text-center mb-10">{t("subtitle")}</p>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
