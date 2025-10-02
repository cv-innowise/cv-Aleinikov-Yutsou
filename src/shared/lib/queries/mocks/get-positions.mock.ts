import { vi } from "vitest";

const { positionsMock } = vi.hoisted(() => ({
  positionsMock: [
    {
      id: "2",
      name: "Systems Analyst",
    },
    {
      id: "3",
      name: "Network Engineer",
    },
    {
      id: "4",
      name: "Database Administrator",
    },
    {
      id: "5",
      name: "UX Designer",
    },
    {
      id: "6",
      name: "Support Specialist",
    },
    {
      id: "7",
      name: "Data Analyst",
    },
  ],
}));
vi.mock("@/shared/lib/queries/get-positions", () => ({
  getPositions: () => positionsMock,
}));
vi.mock("@/shared/lib/hooks/use-get-positions", () => ({
  useGetPositions: () => positionsMock,
}));

export { positionsMock };
