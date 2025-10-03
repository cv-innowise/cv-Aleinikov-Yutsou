"use server";

import { DELETE_SKILL } from "@/shared/graphql/skills/skills.mutations";
import { GET_SKILLS } from "@/shared/graphql/skills/skills.queries";
import {
  DeleteSkillRequest,
  DeleteSkillResponse,
} from "@/shared/graphql/skills/skills.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const deleteSkill = async (skill: DeleteSkillRequest["skill"]) => {
  const { error } = await getClient().mutate<
    DeleteSkillResponse,
    DeleteSkillRequest
  >({
    mutation: DELETE_SKILL,
    variables: { skill },
    refetchQueries: [GET_SKILLS],
  });

  if (error) {
    throw error;
  }
};