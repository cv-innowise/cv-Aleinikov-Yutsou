import { SignupForm } from "@/features/signup";
import { cn } from "@/shared/lib/utils";

const SignupPage = () => {
  return (
    <div className={cn("flex flex-col w-full justify-center items-center px-4")}>
      <h1 className={cn("text-[2.125rem] text-center mb-6")}>Register now</h1>
      <p className={cn("text-[1rem] leading-[1.5]  text-center mb-10")}>Welcome! Sign up to continue</p>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
