import { Position } from "@/shared/graphql/positions/positions.types";
import { vi } from "vitest";

const { positionMock, useGetPositionMock } = vi.hoisted(() => ({
  positionMock: {
    id: "2",
    name: "Systems Analyst",
  },
  useGetPositionMock: (positionId?: Position["id"]) => {
    if (!positionId) {
      return;
    }

    return positionMock;
  },
}));
vi.mock("../queries/use-get-position", () => ({
  useGetPosition: useGetPositionMock,
}));

export { positionMock, useGetPositionMock };