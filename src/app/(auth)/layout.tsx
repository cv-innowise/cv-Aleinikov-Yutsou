"use client";

import { useRouteGuard } from "@/shared/auth";
import { AuthNav } from "@/widgets/auth-nav";
import React from "react";

type AuthLayoutProps = React.PropsWithChildren;

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const ready = useRouteGuard("guest-only", "/");
  if (!ready) return null;

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
