import { ADD_PROFILE_SKILL } from "@/shared/graphql/profile/profile.mutations";
import {
  AddProfileSkillRequest,
  AddProfileSkillResponse,
} from "@/shared/graphql/profile/profile.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const addProfileSkill = (skill: AddProfileSkillRequest["skill"]) => {
  getClient().mutate<AddProfileSkillResponse, AddProfileSkillRequest>({
    mutation: ADD_PROFILE_SKILL,
    variables: { skill },
  });
};