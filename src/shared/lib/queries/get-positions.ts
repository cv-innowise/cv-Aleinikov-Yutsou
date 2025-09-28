import { GET_POSITIONS } from "@/shared/graphql/positions/positions.queries";
import {
  Position,
  PositionsResponse,
} from "@/shared/graphql/positions/positions.types";
import { query } from "../apollo/apollo-client";

export const getPositions = async (): Promise<Position[]> => {
  const { data } = await query<PositionsResponse>({ query: GET_POSITIONS });

  return data?.positions ?? [];
};