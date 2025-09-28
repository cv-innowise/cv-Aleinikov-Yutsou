import {
  UserRequest,
  User,
  UserResponse,
} from "../../graphql/users/users.types";
import { GET_USER } from "../../graphql/users/users.queries";
import { query } from "../apollo/apollo-client";
import { UserRole } from "@/shared/types/cv-graphql";

export const getAuthUser = async (): Promise<User> => {
  const { id } = { id: "760" }; //getSession() ;
  const { data } = await query<UserResponse, UserRequest>({
    query: GET_USER,
    variables: { userId: id },
  });

  if (!data?.user) {
    throw new Error("Unauthorized");
  }

  return { ...data.user, role: UserRole.Admin };
};
