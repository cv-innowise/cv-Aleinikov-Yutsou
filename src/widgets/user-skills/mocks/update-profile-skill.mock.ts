import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  updateProfileSkillMock: vi.fn(),
}));
vi.mock("../mutations/update-profile-skill", () => ({
  updateProfileSkill: hoisted.updateProfileSkillMock,
}));

export const updateProfileSkillMock = hoisted.updateProfileSkillMock;
