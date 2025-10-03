import { GET_USER } from "@/shared/graphql/users/users.queries";
import {
  User,
  UserRequest,
  UserResponse,
} from "@/shared/graphql/users/users.types";
import { query } from "@/shared/lib/apollo/apollo-client";

export const getUser = async (userId: User["id"]) => {
  const res = await query<UserResponse, UserRequest>({
    query: GET_USER,
    variables: { userId },
  }).catch(() => {});

  return res?.data?.user;
};
