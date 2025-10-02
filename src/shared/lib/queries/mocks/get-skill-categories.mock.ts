import { vi } from "vitest";

const { skillCategoriesMock } = vi.hoisted(() => ({
  skillCategoriesMock: [
    {
      id: "1",
      name: "Programming languages",
    },
    { id: "2", name: "Frontend" },
    {
      id: "3",
      name: "Frontend technologies",
    },
    {
      id: "4",
      name: "State management libraries",
    },
  ],
}));
vi.mock("@/shared/lib/queries/get-skill-categories", () => ({
  getSkillCategories: () => skillCategoriesMock,
}));

export { skillCategoriesMock };
