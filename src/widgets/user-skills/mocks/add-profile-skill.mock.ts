import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  addProfileSkillMock: vi.fn(),
}));
vi.mock("../mutations/add-profile-skill", () => ({
  addProfileSkill: hoisted.addProfileSkillMock,
}));

export const addProfileSkillMock = hoisted.addProfileSkillMock;
