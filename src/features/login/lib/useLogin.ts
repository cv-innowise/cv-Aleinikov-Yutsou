import { useLazyQuery } from "@apollo/client/react";
import { LoginArgs, LoginResult } from "../types";
import { LOGIN_QUERY } from "@/shared/graphql/auth.gql";

export const useLogin = () => useLazyQuery<LoginResult, LoginArgs>(LOGIN_QUERY);
