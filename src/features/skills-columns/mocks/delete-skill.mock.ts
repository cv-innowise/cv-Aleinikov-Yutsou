import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({ deleteSkillMock: vi.fn() }));
vi.mock("../mutations/delete-skill", () => ({
  deleteSkill: hoisted.deleteSkillMock,
}));

export const deleteSkillMock = hoisted.deleteSkillMock;
