import {
  Mastery,
} from "@/shared/types/cv-graphql";
import { vi } from "vitest";

const skillsMock = [
  {
    id: "1",
    name: "JavaScript",
    category: {
      id: "1",
      category_name: "Programming languages",
    },
    category_name: "Programming languages",
  },
  {
    id: "3",
    name: "React",
    category: {
      id: "3",
      category_name: "Frontend technologies",
    },
    category_name: "Frontend technologies",
  },
  {
    id: "4",
    name: "Redux",
    category: {
      id: "4",
      category_name: "State management libraries",
    },
    category_name: "State management libraries",
  },
  {
    id: "5",
    name: "MobX",
    category: {
      id: "4",
      category_name: "State management libraries",
    },
    category_name: "State management libraries",
  },
  {
    id: "6",
    name: "Three.js",
    category: {
      id: "3",
      category_name: "Frontend technologies",
    },
    category_name: "Frontend technologies",
  },
  {
    id: "7",
    name: "Redux Toolkit",
    category: {
      id: "4",
      category_name: "State management libraries",
    },
    category_name: "State management libraries",
  },
  {
    id: "8",
    name: "Python",
    category: {
      id: "1",
      category_name: "Programming languages",
    },
    category_name: "Programming languages",
  },
];
const skillsByCategoriesMock = {
  "Frontend technologies": [
    {
      name: "React",
      categoryId: "3",
      mastery: Mastery.Proficient,
    },
  ],
  "State management libraries": [
    {
      name: "Redux",
      categoryId: "4",
      mastery: Mastery.Proficient,
    },
    {
      name: "Redux Toolkit",
      categoryId: "4",
      mastery: Mastery.Competent,
    },
  ],
  "Programming languages": [
    {
      name: "Python",
      categoryId: "1",
      mastery: Mastery.Competent,
    },
  ],
};
const categoriesMock = [
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
];
const addSkillMock = vi.fn();
const updateSkillMock = vi.fn();
const deleteSkillMock = vi.fn();

export {
  skillsMock,
  skillsByCategoriesMock,
  categoriesMock,
  addSkillMock,
  updateSkillMock,
  deleteSkillMock,
};
