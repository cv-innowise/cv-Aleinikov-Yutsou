"use client";

import { useUpdateToken } from "@/shared/lib/hooks/use-update-token";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type RootLayoutProps = React.PropsWithChildren;

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [updateToken] = useUpdateToken();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!accessToken || !refreshToken) {
      router.push("/login");
      return;
    }

    updateToken()
      .then((res) => {
        const data = res.data?.updateToken;
        if (data?.access_token && data?.refresh_token) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
        } else {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          router.push("/login");
        }
      })
      .catch((err) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        console.error("Token update failed:", err);
        router.push("/login");
      });
  }, [router, updateToken]);

  return <>{children}</>;
};

export default RootLayout;
