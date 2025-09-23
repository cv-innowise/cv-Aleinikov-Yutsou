import { RouteGuard } from "@/shared/auth/model/route-guard";
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Navbar } from "@/widgets/navbar";
import React from "react";

type RootLayoutProps = React.PropsWithChildren;

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <RouteGuard mode="require-auth">
      <SidebarProvider>
        <Navbar />
        <div>
          <header>
            <SidebarTrigger />
          </header>
          <main>{children}</main>
        </div>
        {children}
      </SidebarProvider>
    </RouteGuard>
  );
};

export default RootLayout;
