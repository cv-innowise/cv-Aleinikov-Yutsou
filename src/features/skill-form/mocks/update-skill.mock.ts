import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  updateSkillMock: vi.fn(),
}));
vi.mock("../mutations/update-skill", () => ({
  updateSkill: hoisted.updateSkillMock,
}));

export const updateSkillMock = hoisted.updateSkillMock;
