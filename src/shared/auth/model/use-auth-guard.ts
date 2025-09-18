"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessTokenClientSide } from "@/shared/lib/cookies";

type Mode = "require-auth" | "guest-only";

export function useRouteGuard(mode: Mode, redirectTo: string) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const access = typeof window !== "undefined" ? getAccessTokenClientSide() : null;

  useEffect(() => {
    if (mode === "require-auth") {
      if (!access) {
        router.replace(redirectTo);
        return;
      }
    } else {
      if (access) {
        router.replace(redirectTo);
        return;
      }
    }
    setReady(true);
  }, [mode, redirectTo, router]);

  return ready;
}
