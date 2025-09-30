import { LanguageSwitcher } from "@/features/language-switcher";
import { RouteGuard } from "@/shared/auth/model/route-guard";
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import { AppBreadcrumbs } from "@/widgets/app-breadcrumbs";
import { Navbar } from "@/widgets/navbar";
import React from "react";

type RootLayoutProps = React.PropsWithChildren;

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <RouteGuard mode="require-auth">
      <SidebarProvider>
        <Navbar />
        <div>
          <header className="flex items-center gap-4 p-2.5">
            <SidebarTrigger />

            <AppBreadcrumbs />

            <LanguageSwitcher />
          </header>
          <main className="p-2.5">{children}</main>
        </div>
      </SidebarProvider>
    </RouteGuard>
  );
};

export default RootLayout;
