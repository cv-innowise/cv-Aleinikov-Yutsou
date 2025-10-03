import { Skill, SkillCategory } from "@/shared/graphql/skills/skills.types";
import { SkillMastery } from "@/shared/types/cv-graphql";

export interface SkillsPreviewProps {
  skills: Skill[];
  skillsByCategories: Record<string, SkillMastery[]>;
  categories: SkillCategory[];
  addSkill: (skill: SkillMastery) => Promise<void>;
  updateSkill: (skill: SkillMastery) => Promise<void>;
  deleteSkill: (skill: { name: string[] }) => Promise<void>;
  isEditable: boolean;
}
