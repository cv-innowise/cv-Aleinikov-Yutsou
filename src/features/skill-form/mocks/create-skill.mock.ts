import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  createSkillMock: vi.fn(),
}));
vi.mock("../mutations/create-skill", () => ({
  createSkill: hoisted.createSkillMock,
}));

export const createSkillMock =   hoisted.createSkillMock;
