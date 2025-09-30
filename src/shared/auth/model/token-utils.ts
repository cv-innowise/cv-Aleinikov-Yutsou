import { jwtDecode } from "jwt-decode";

type JwtPayload = { exp?: number };

const isTokenExpired = (token?: string): boolean => {
  try {
    if (!token) return true;
    const { exp } = jwtDecode<JwtPayload>(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

const isTokenExpiring = (token?: string, skewSec = 30): boolean => {
  try {
    if (!token) return true;
    const { exp } = jwtDecode<JwtPayload>(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000 - skewSec * 1000;
  } catch {
    return true;
  }
};

export { isTokenExpired, isTokenExpiring };
