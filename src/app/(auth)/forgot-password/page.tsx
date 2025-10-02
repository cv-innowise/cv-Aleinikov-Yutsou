import { ForgotPasswordForm } from "@/features/forgot-password-form";

const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center px-4">
      <h1 className="text-4xl text-center mb-6">Forgot password</h1>
      <p className="leading-1.5 text-center mb-10">We will sent you an email with further instructions</p>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;
