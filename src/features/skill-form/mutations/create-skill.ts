"use server";

import { CREATE_SKILL } from "@/shared/graphql/skills/skills.mutations";
import { GET_SKILLS } from "@/shared/graphql/skills/skills.queries";
import {
  CreateSkillRequest,
  CreateSkillResponse,
} from "@/shared/graphql/skills/skills.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const createSkill = async (skill: CreateSkillRequest["skill"]) => {
  const { error } = await getClient().mutate<
    CreateSkillResponse,
    CreateSkillRequest
  >({
    mutation: CREATE_SKILL,
    variables: { skill },
    refetchQueries: [GET_SKILLS],
  });

  if (error) {
    throw error;
  }
};