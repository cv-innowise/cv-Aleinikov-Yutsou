import { redirect } from "next/navigation";
import { getAccessTokenServerSide, getRefreshTokenServerSide } from "@/shared/lib/cookies";
import { isTokenExpired } from "./token-utils";

type Mode = "require-auth" | "guest-only";

interface RouteGuardProps {
  mode: Mode;
  children: React.ReactNode;
}

export const RouteGuard: React.FC<RouteGuardProps> = async ({ children, mode }) => {
  let isAuthChecked = false;

  const accessToken = await getAccessTokenServerSide();
  const refreshToken = await getRefreshTokenServerSide();

  if (!isTokenExpired(accessToken) || !isTokenExpired(refreshToken)) {
    isAuthChecked = true;
  }

  if (mode === "require-auth" && !isAuthChecked) {
    redirect("/login");
  }

  if (mode === "guest-only" && isAuthChecked) {
    redirect("/users");
  }

  return <>{children}</>;
};
