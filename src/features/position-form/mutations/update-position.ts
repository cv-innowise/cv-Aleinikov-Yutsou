"use server";

import { UPDATE_POSITION } from "@/shared/graphql/positions/positions.mutations";
import { GET_POSITIONS } from "@/shared/graphql/positions/positions.queries";
import {
  UpdatePositionRequest,
  UpdatePositionResponse,
} from "@/shared/graphql/positions/positions.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const updatePosition = async (
  position: UpdatePositionRequest["position"]
) => {
  const { error } = await getClient().mutate<UpdatePositionResponse, UpdatePositionRequest>({
    mutation: UPDATE_POSITION,
    variables: { position },
    refetchQueries: [GET_POSITIONS],
  });
  
  if (error) {
    throw error;
  }
};