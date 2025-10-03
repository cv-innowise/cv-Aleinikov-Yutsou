import { UserRequest, User, UserResponse } from "../../graphql/users/users.types";
import { GET_USER } from "../../graphql/users/users.queries";
import { query } from "../apollo/apollo-client";
import { UserRole } from "@/shared/types/cv-graphql";
import { getSessionServerSide } from "../cookies";

export const getAuthUser = async (): Promise<User> => {
  const session = await getSessionServerSide();
  const { data } = await query<UserResponse, UserRequest>({
    query: GET_USER,
    variables: { userId: session?.id },
  });

  if (!data?.user) {
    throw new Error("Unauthorized");
  }

  return { ...data.user, role: UserRole.Admin };
};
