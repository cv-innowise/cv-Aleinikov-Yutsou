import { UPDATE_TOKEN_MUTATION } from "@/shared/graphql/auth/auth.queries";
import { useMutation } from "@apollo/client/react";
import { UpdateTokenResult } from "cv-graphql";

type UpdateResult = {
  updateToken: UpdateTokenResult;
};

export const useUpdateToken = () => useMutation<UpdateResult>(UPDATE_TOKEN_MUTATION);
