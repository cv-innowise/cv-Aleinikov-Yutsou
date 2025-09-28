import { GET_SKILL_CATEGORIES } from "@/shared/graphql/skills/skills.queries";
import {
  SkillCategoriesResponse,
  SkillCategory,
} from "@/shared/graphql/skills/skills.types";
import { query } from "@/shared/lib/apollo/apollo-client";

export const getSkillCategories = async (): Promise<SkillCategory[]> => {
  const { data } = await query<SkillCategoriesResponse>({
    query: GET_SKILL_CATEGORIES,
  });

  return data?.skillCategories ?? [];
};
