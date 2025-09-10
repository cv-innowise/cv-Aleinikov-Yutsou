import type { AuthInput, AuthResult } from "cv-graphql";

export interface AuthArgs {
  auth: AuthInput;
}
export interface LoginResult {
  login: AuthResult;
}
export interface SignupResult {
  signup: AuthResult;
}
