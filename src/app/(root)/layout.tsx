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
        <div className="w-full h-full">
          <header className="flex items-center gap-4 p-2.5">
            <SidebarTrigger />

            <AppBreadcrumbs />

          </header>
          <main className="p-4">{children}</main>
        </div>
      </SidebarProvider>
    </RouteGuard>
  );
};

export default RootLayout;
