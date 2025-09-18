"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "./token-service";

type Mode = "require-auth" | "guest-only";

export function useRouteGuard(mode: Mode, redirectTo: string) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (typeof window === "undefined") return;

      const access = await getAccessToken();

      if (mode === "require-auth") {
        if (!access) {
          if (!cancelled) router.replace(redirectTo);
          return;
        }
      } else {
        if (access) {
          if (!cancelled) router.replace(redirectTo);
          return;
        }
      }

      if (!cancelled) setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [mode, redirectTo, router]);

  return ready;
}
