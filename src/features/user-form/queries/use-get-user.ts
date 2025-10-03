import { GET_USER } from "@/shared/graphql/users/users.queries";
import {
  User,
  UserRequest,
  UserResponse,
} from "@/shared/graphql/users/users.types";
import { useSuspenseQuery } from "@apollo/client/react";

export const useGetUser = (userId?: User["id"]) => {
  if (!userId) {
    return;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useSuspenseQuery<UserResponse, UserRequest>(GET_USER, {
    variables: { userId },
  });

  return data.user;
};
