import { UPDATE_TOKEN_MUTATION } from "@/shared/graphql/auth/auth.mutations";
import { useMutation } from "@apollo/client/react";
import { UpdateTokenResult } from "cv-graphql";

type UpdateResponse = {
  updateToken: UpdateTokenResult;
};

export const useUpdateToken = () => useMutation<UpdateResponse>(UPDATE_TOKEN_MUTATION);
