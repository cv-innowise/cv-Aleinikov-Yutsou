import {
  User,
  UserRequest,
  UserResponse,
} from "@/shared/graphql/users/users.types";
import { getSession } from "../cookies";
import { useSuspenseQuery } from "@apollo/client/react";
import { GET_USER } from "@/shared/graphql/users/users.queries";
import { UserRole } from "@/shared/types/cv-graphql";

export const useGetAuthUser = (): User => {
  const { id } = getSession();
  const { data } = useSuspenseQuery<UserResponse, UserRequest>(GET_USER, {
    variables: { userId: id },
  });

  return { ...data.user, role: UserRole.Admin };
};
