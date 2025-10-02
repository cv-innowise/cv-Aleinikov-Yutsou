import { UPDATE_PROFILE_SKILL } from "@/shared/graphql/profile/profile.mutations";
import {
  UpdateProfileSkillRequest,
  UpdateProfileSkillResponse,
} from "@/shared/graphql/profile/profile.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const updateProfileSkill = (
  skill: UpdateProfileSkillRequest["skill"]
) => {
  getClient().mutate<UpdateProfileSkillResponse, UpdateProfileSkillRequest>({
    mutation: UPDATE_PROFILE_SKILL,
    variables: { skill },
  });
};