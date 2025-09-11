import { SignupForm } from "@/features/signup-form";
import { cn } from "@/shared/lib/utils";

const SignupPage = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center px-4">
      <h1 className="text-4xl text-center mb-6">Register now</h1>
      <p className="leading-1.5 text-center mb-10">Welcome! Sign up to continue</p>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
