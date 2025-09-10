import { LoginForm } from "@/features/login";
import { cn } from "@/shared/lib/utils";

const LoginPage = () => {
  return (
    <main className={cn("flex flex-col justify-center items-center min-h-screen px-4")}>
      <h1 className={cn("text-[2.125rem] text-center mb-6")}>Welcome back</h1>
      <p className={cn("text-[1rem] leading-[1.5]  text-center mb-10")}>Hello again! Log in to continue</p>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
