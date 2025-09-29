import { GET_USERS } from "@/shared/graphql/users/users.queries"
import { UserItem, UsersResponse } from "@/shared/graphql/users/users.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const getUsers = async (): Promise<UserItem[]> => {
  const { data } = await getClient().query<UsersResponse>({query:GET_USERS});
  
  return data?.users ?? [];
};