import { useSuspenseQuery } from "@apollo/client/react";
import { GET_POSITIONS } from "@/shared/graphql/positions/positions.queries";
import { Position, PositionsResponse } from "@/shared/graphql/positions/positions.types";

export const useGetPosition = (positionId?: Position["id"]) => {
  if (!positionId) {
    return;
  }
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useSuspenseQuery<PositionsResponse>(GET_POSITIONS);
  const position = data.positions.find((pos) => pos.id === positionId)

  return position;
}