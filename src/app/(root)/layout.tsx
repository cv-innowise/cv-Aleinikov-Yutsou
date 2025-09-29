"use client";

import { useRouteGuard } from "@/shared/auth";
import React from "react";

type RootLayoutProps = React.PropsWithChildren;

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const ready = useRouteGuard("require-auth", "/login");

  if (!ready) return null;

  return <>{children}</>;
};

export default RootLayout;
