import { GET_SKILL_CATEGORIES } from "@/shared/graphql/skills/skills.queries";
import { SkillCategoriesResponse } from "@/shared/graphql/skills/skills.types";
import { useSuspenseQuery } from "@apollo/client/react";

export const useGetSkillCategories = () => {
  const { data } =
    useSuspenseQuery<SkillCategoriesResponse>(GET_SKILL_CATEGORIES);

  return data.skillCategories;
};
