import { vi } from "vitest";

const { deleteSkillMock } = vi.hoisted(() => ({ deleteSkillMock: vi.fn() }));
vi.mock("../mutations/use-delete-skill", () => ({
  useDeleteSkill: () => ({
    deleteSkill: deleteSkillMock,
    skill: {},
    loading: false,
    error: null,
  }),
}));

export { deleteSkillMock };
