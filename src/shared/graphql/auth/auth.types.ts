import type { AuthInput, AuthResult } from "cv-graphql";

interface AuthRequest {
  auth: AuthInput;
}

interface LoginResponse {
  login: AuthResult;
}

interface SignupResponse {
  signup: AuthResult;
}

export type { AuthRequest, LoginResponse, SignupResponse };
