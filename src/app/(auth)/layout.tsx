import { RouteGuard } from "@/shared/auth/model/route-guard";
import { AuthNav } from "@/widgets/auth-nav";
import React from "react";

type AuthLayoutProps = React.PropsWithChildren;

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {

  return (
    <RouteGuard mode="guest-only">
      <div className="flex flex-col min-h-screen">
        <header className="w-full flex justify-center items-center px-4">
          <AuthNav />
        </header>
        <main className="flex-1 flex flex-col justify-center items-center px-4">{children}</main>
      </div>
    </RouteGuard>

  );
};

export default AuthLayout;
