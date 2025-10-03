import { vi } from "vitest";

const { getProjectMock, projectMock } = vi.hoisted(() => ({
  projectMock: {
    id: "1",
    name: "Haul Tracking",
    internal_name: "🇮🇹 ReqE-MatterportProject-IT/1А4",
    domain: "Business apps",
    start_date: "02/11/2024",
    description:
      "Materials and cargo hauling application for multiple customers domains.",
    environment: [
      "React",
      "TypeScript",
      "RTK Query",
      "Node.js",
      "SST",
      "Neo4j",
      "Server-Sent Events",
      "JavaScript",
    ],
  },
  getProjectMock: vi.fn().mockImplementation(() => projectMock),
}));
vi.mock("../queries/get-project", () => ({
  getProject: getProjectMock,
}));

export { projectMock, getProjectMock };
