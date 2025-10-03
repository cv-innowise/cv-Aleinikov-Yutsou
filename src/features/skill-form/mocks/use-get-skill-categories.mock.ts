import { vi } from "vitest";

const { skillCategoriesMock, useGetSkillCategoriesMock } = vi.hoisted(() => ({
  skillCategoriesMock: [
    { id: "1", name: "Programming languages" },
    { id: "2", name: "Frontend" },
    { id: "3", name: "Frontend technologies" },
  ],
  useGetSkillCategoriesMock: () => skillCategoriesMock,
}));
vi.mock("../queries/use-get-skill-categories", () => ({
  useGetSkillCategories: useGetSkillCategoriesMock,
}));

export { skillCategoriesMock };
