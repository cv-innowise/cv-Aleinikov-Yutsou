import { vi } from "vitest";

const { skillsMock } = vi.hoisted(() => ({
  skillsMock: [
    {
      id: "1",
      name: "JavaScript",
      category_name: "Programming languages",
    },
    {
      id: "3",
      name: "React",
      category_name: "Frontend technologies",
    },
    {
      id: "4",
      name: "Redux",
      category_name: "State management libraries",
    },
    {
      id: "5",
      name: "MobX",
      category_name: "State management libraries",
    },
    {
      id: "6",
      name: "Three.js",
      category_name: "Frontend technologies",
    },
  ],
}));
vi.mock("@/shared/lib/queries/get-skills", () => ({
  getSkills: () => skillsMock,
}));

export { skillsMock };