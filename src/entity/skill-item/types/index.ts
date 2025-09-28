import { Mastery, SkillMastery } from "@/shared/types/cv-graphql";

export type SkillCategory = {
    name: string;
    skills: string[];
}
  
export interface SkillItemProps {
  skillsByCategories: Record<string, { name: string, categoryId: string }[]>;
  name?: string;
  mastery?: Mastery;
  isEditable: boolean;
  isDisabled: boolean;
  onChange: ({ name, mastery, categoryId }: Partial<SkillMastery>) => void;
}