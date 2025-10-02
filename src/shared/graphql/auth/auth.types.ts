import type { AuthInput, AuthResult, ForgotPasswordInput } from "cv-graphql";

interface AuthRequest {
  auth: AuthInput;
}

interface LoginResponse {
  login: AuthResult;
}

interface SignupResponse {
  signup: AuthResult;
}

interface ForgotPasswordResponse {
  forgotPassword: null;
}

interface ForgotPasswordRequest {
  auth: ForgotPasswordInput;
}

export type { AuthRequest, LoginResponse, SignupResponse, ForgotPasswordResponse, ForgotPasswordRequest };
