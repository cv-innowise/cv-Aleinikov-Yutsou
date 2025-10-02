import { GET_POSITIONS } from "@/shared/graphql/positions/positions.queries";
import {
  Position,
  PositionsResponse,
} from "@/shared/graphql/positions/positions.types";
import { useSuspenseQuery } from "@apollo/client/react";

export const useGetPositions = (): Position[] => {
  const { data } = useSuspenseQuery<PositionsResponse>(GET_POSITIONS);

  return data.positions;
};
