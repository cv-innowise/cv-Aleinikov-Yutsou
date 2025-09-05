import { Mastery, Skill } from "@/shared/lib/types/skill";

export type SkillCategory = {
    name: string;
    skills: string[];
}
  
export interface SkillItemProps {
  categories: SkillCategory[];
  skill?: string;
  mastery?: Mastery;
  isEditable: boolean;
  isDisabled: boolean;
  onChange: ({ name, mastery }: Partial<Skill>) => void;
}