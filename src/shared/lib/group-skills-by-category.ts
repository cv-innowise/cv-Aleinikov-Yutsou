import { SkillCategory } from "../graphql/skills/skills.types";
import { SkillMastery } from "../types/cv-graphql";

export function groupSkillsByCategory(skills: SkillMastery[], categories: SkillCategory[]): { categoryName: string; skills: string[] }[] {
  const groupedSkills = skills.reduce<Record<string, { categoryName: string; skills: string[] }>>((acc, currentSkill) => {
    const category = categories.find((category) => category.id === currentSkill.categoryId);
    const categoryName = category?.name || "Other";
    const categoryKey = currentSkill.categoryId || categoryName;

    if (!acc[categoryKey]) {
      acc[categoryKey] = {
        categoryName: categoryName,
        skills: [],
      };
    }

    acc[categoryKey].skills.push(currentSkill.name);
    return acc;
  }, {});

  const sortedCategories = Object.values(groupedSkills).sort((firstCategory, secondCategory) => firstCategory.categoryName.localeCompare(secondCategory.categoryName));

  return sortedCategories;
}
