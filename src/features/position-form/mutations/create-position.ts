"use server";

import { CREATE_POSITION } from "@/shared/graphql/positions/positions.mutations";
import { GET_POSITIONS } from "@/shared/graphql/positions/positions.queries";
import {
  CreatePositionRequest,
  CreatePositionResponse,
} from "@/shared/graphql/positions/positions.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const createPosition = async (
  position: CreatePositionRequest["position"]
) => {
  const { error } = await getClient().mutate<CreatePositionResponse, CreatePositionRequest>({
    mutation: CREATE_POSITION,
    variables: { position },
    refetchQueries: [GET_POSITIONS],
  });
  
  if (error) {
    throw error;
  }
};
