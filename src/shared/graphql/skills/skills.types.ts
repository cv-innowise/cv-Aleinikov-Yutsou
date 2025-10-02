import {
  Skill as FullSkill,
  SkillCategory as FullSkillCategory,
  CreateSkillInput,
  UpdateSkillInput,
  DeleteSkillInput,
  DeleteResult,
} from "@/shared/types/cv-graphql";

type Skill = Pick<FullSkill, "id" | "name" | "category_name"> & {
  category: {
    id: SkillCategory["id"]
  }
};
type SkillCategory = Pick<FullSkillCategory, "id" | "name">;

type CreateSkillRequest = { skill: CreateSkillInput };
type UpdateSkillRequest = { skill: UpdateSkillInput };
type DeleteSkillRequest = { skill: DeleteSkillInput };

type SkillsResponse = { skills: Skill[] };
type SkillCategoriesResponse = { skillCategories: SkillCategory[] };
type CreateSkillResponse = { createSkill: Skill };
type UpdateSkillResponse = { updateSkill: Skill };
type DeleteSkillResponse = { deleteSkill: DeleteResult };

export type {
  Skill,
  SkillCategory,
  CreateSkillRequest,
  UpdateSkillRequest,
  DeleteSkillRequest,
  SkillsResponse,
  SkillCategoriesResponse,
  CreateSkillResponse,
  UpdateSkillResponse,
  DeleteSkillResponse,
};
