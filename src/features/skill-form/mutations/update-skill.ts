"use server";

import { UPDATE_SKILL } from "@/shared/graphql/skills/skills.mutations";
import { GET_SKILLS } from "@/shared/graphql/skills/skills.queries";
import {
  UpdateSkillRequest,
  UpdateSkillResponse,
} from "@/shared/graphql/skills/skills.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const updateSkill = async (skill: UpdateSkillRequest["skill"]) => {
  const { error } = await getClient().mutate<
    UpdateSkillResponse,
    UpdateSkillRequest
  >({
    mutation: UPDATE_SKILL,
    variables: { skill },
    refetchQueries: [GET_SKILLS],
  });

  if (error) {
    throw error;
  }
};