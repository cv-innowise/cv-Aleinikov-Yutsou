import { GET_SKILLS } from "@/shared/graphql/skills/skills.queries";
import { Skill, SkillsResponse } from "@/shared/graphql/skills/skills.types";
import { query } from "@/shared/lib/apollo/apollo-client";

export const getSkills = async (): Promise<Skill[]> => {
  const { data } = await query<SkillsResponse>({ query: GET_SKILLS });

  return data?.skills ?? [];
};