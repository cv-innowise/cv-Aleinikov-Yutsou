import {
  Position as FullPosition,
  CreatePositionInput,
  UpdatePositionInput,
  DeletePositionInput,
  DeleteResult,
} from "@/shared/types/cv-graphql";

type Position = Pick<FullPosition, "id" | "name">;

type PositionsResponse = { positions: Position[] };
type CreatePositionResponse = { createPosition: Position };
type UpdatePositionResponse = { updatePosition: Position };
type DeletePositionResponse = { deletePosition: DeleteResult };

type CreatePositionRequest = { position: CreatePositionInput };
type UpdatePositionRequest = { position: UpdatePositionInput };
type DeletePositionRequest = { position: DeletePositionInput };

export type {
  Position,
  PositionsResponse,
  CreatePositionResponse,
  UpdatePositionResponse,
  DeletePositionResponse,
  CreatePositionRequest,
  UpdatePositionRequest,
  DeletePositionRequest,
};
