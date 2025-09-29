import { Position } from "@/shared/graphql/positions/positions.types";
import { vi } from "vitest";

const { skillMock, useGetSkillMock } = vi.hoisted(() => ({
  skillMock: {
    id: "1",
    name: "JavaScript",
    category: { id: "1" },
    category_name: "Programming languages",
  },
  useGetSkillMock: (positionId?: Position["id"]) => {
    if (!positionId) {
      return;
    }

    return skillMock;
  },
}));
vi.mock("../queries/use-get-skill", () => ({
  useGetSkill: useGetSkillMock,
}));

export { skillMock, useGetSkillMock };
