import { SkillCategory } from "@/shared/graphql/skills/skills.types";

export function useGetSkillsByCategories<
  T extends { name: string; categoryId?: string | null }
>(skills: T[], categories: SkillCategory[]) {
  const skillsByCategories: Record<string, T[]> = {};
  const categoriesMappa: Record<string, string> = {};

  categories.forEach((cat) => {
    categoriesMappa[cat.id] = cat.name;
  });

  skills.forEach((skill) => {
    const catName = categoriesMappa[skill.categoryId!] || "Other";

    if (skillsByCategories[catName]) {
      skillsByCategories[catName].push(skill);
    } else {
      skillsByCategories[catName] = [skill];
    }
  });

  return skillsByCategories;
}
