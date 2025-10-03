"use server";

import { DELETE_POSITION } from "@/shared/graphql/positions/positions.mutations";
import { GET_POSITIONS } from "@/shared/graphql/positions/positions.queries";
import {
  DeletePositionRequest,
  DeletePositionResponse,
} from "@/shared/graphql/positions/positions.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const deletePosition = async (position: DeletePositionRequest["position"]) => {
  const { error } = await getClient().mutate<DeletePositionResponse, DeletePositionRequest>({
    mutation: DELETE_POSITION,
    variables: { position },
    refetchQueries: [GET_POSITIONS],
  });
  
  if (error) {
    throw error;
  }
};
