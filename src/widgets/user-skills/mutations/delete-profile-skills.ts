import { DELETE_PROFILE_SKILL } from "@/shared/graphql/profile/profile.mutations";
import {
  DeleteProfileSkillRequest,
  DeleteProfileSkillResponse,
} from "@/shared/graphql/profile/profile.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const deleteProfileSkills = (
  skill: DeleteProfileSkillRequest["skill"]
) => {
  getClient().mutate<DeleteProfileSkillResponse, DeleteProfileSkillRequest>({
    mutation: DELETE_PROFILE_SKILL,
    variables: { skill },
  });
};
