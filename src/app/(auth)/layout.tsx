"use client";

import { Header } from "@/widgets/header/ui/header";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  useEffect(() => {
    const accsessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (accsessToken && refreshToken) {
      router.push("/");
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col justify-center items-center px-4">{children}</main>
    </div>
  );
}
