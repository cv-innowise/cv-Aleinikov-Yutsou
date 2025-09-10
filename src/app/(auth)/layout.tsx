"use client";

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
    <>
      <header></header>
      {children}
    </>
  );
}
