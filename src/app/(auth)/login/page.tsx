import { LoginForm } from "@/features/login-form";

const LoginPage = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center px-4">
      <h1 className="text-4xl text-center mb-6">Welcome back</h1>
      <p className="leading-1.5 text-center mb-10">Hello again! Log in to continue</p>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
