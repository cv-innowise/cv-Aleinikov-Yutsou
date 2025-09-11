"use client";

import { AuthNav } from "@/widgets/auth-nav";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type AuthLayoutProps = React.PropsWithChildren;

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (accessToken && refreshToken) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full flex justify-center items-center px-4">
        <AuthNav />
      </header>
      <main className="flex-1 flex flex-col justify-center items-center px-4">{children}</main>
    </div>
  );
};

export default AuthLayout;
