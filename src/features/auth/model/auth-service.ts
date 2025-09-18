import { setSession, setTokens } from "@/shared/lib/cookies";
import { AuthResult } from "cv-graphql";

export const successAuth = ({ access_token, refresh_token, user }: AuthResult) => {
  setTokens(access_token, refresh_token);
  setSession(user.id, user.email, user.role);
};
