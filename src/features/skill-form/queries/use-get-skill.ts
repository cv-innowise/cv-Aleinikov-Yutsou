import { GET_SKILLS } from "@/shared/graphql/skills/skills.queries";
import { Skill, SkillsResponse } from "@/shared/graphql/skills/skills.types";
import { useSuspenseQuery } from "@apollo/client/react";

export const useGetSkill = (skillId?: Skill["id"]) => {
  if (!skillId) {
    return;
  }
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useSuspenseQuery<SkillsResponse>(GET_SKILLS);
  const skill = data.skills.find((skill) => skill.id === skillId);

  return skill;
}