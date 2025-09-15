"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, getRefreshToken } from "./tokens";

type Mode = "require-auth" | "guest-only";

export function useRouteGuard(mode: Mode, redirectTo: string) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isAuthed = Boolean(getAccessToken() && getRefreshToken());
    if (mode === "require-auth") {
      if (!isAuthed) {
        router.replace(redirectTo);
        return;
      }
    } else {
      if (isAuthed) {
        router.replace(redirectTo);
        return;
      }
    }
    setReady(true);
  }, [mode, redirectTo, router]);

  return ready;
}
