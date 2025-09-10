import type { AuthInput, AuthResult } from "cv-graphql";

export interface LoginArgs {
  auth: AuthInput;
}
export interface LoginResult {
  login: AuthResult;
}
