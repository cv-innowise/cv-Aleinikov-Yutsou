import { vi } from "vitest";

const { skillsMock } = vi.hoisted(() => ({
  skillsMock: [
    {
      id: "1",
      name: "JavaScript",
      category: {
        id: "1",
        name: "Programming languages",
      },
      category_name: "Programming languages",
    },
    {
      id: "3",
      name: "React",
      category: {
        id: "3",
        name: "Frontend technologies",
      },
      category_name: "Frontend technologies",
    },
    {
      id: "4",
      name: "Redux",
      category: {
        id: "4",
        name: "State management libraries",
      },
      category_name: "State management libraries",
    },
    {
      id: "5",
      name: "MobX",
      category: {
        id: "4",
        name: "State management libraries",
      },
      category_name: "State management libraries",
    },
    {
      id: "6",
      name: "Three.js",
      category: {
        id: "3",
        name: "Frontend technologies",
      },
      category_name: "Frontend technologies",
    },
  ],
}));
vi.mock("@/shared/lib/queries/get-skills", () => ({
  getSkills: () => skillsMock,
}));

export { skillsMock };