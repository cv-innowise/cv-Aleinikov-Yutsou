import { vi } from "vitest";

const hoisted = vi.hoisted(() => ({
  deleteProfileSkillsMock: vi.fn(),
}));
vi.mock("../mutations/delete-profile-skills", () => ({
  deleteProfileSkills: hoisted.deleteProfileSkillsMock,
}));

export const deleteProfileSkillsMock = hoisted.deleteProfileSkillsMock;
