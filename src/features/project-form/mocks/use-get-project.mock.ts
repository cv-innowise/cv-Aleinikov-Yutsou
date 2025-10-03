import { Project } from "@/shared/graphql/projects/projects.types";
import { vi } from "vitest";

const { projectMock, useGetProjectMock } = vi.hoisted(() => ({
  projectMock: {
    id: "1",
    name: "Virtual Tours",
    domain: "AR (Augmented Reality)",
    start_date: "2019-02-27",
    end_date: "2023-11-13",
    description:
      "Project description",
    environment: [
      "JavaScript",
      "TypeScript",
    ],
  },
  useGetProjectMock: (projectId?: Project["id"]) => {
    if (!projectId) {
      return;
    }

    return projectMock;
  },
}));
vi.mock("../queries/use-get-project", () => ({
  useGetProject: useGetProjectMock,
}));

export { projectMock, useGetProjectMock };