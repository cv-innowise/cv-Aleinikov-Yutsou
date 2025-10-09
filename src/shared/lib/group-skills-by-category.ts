import { SkillCategory } from "../graphql/skills/skills.types";
import { SkillMastery } from "../types/cv-graphql";

export function groupSkillsByCategory(skills: SkillMastery[], categories: SkillCategory[]): { categoryName: string; skills: string[] }[] {
  const categoryMap = skills.reduce<Record<string, { categoryName: string; skills: string[] }>>((acc, s) => {
    const catName = categories.find((c) => c.id === s.categoryId)?.name || "Other";
    const key = s.categoryId || catName;
    if (!acc[key]) acc[key] = { categoryName: catName, skills: [] };
    acc[key].skills.push(s.name);
    return acc;
  }, {});
  return Object.values(categoryMap).sort((a, b) => a.categoryName.localeCompare(b.categoryName));
}
