import { UPDATE_CV_SKILL } from "@/shared/graphql/cvs/cvs.mutations";
import { UpdateCvSkillRequest, UpdateCvSkillResponse } from "@/shared/graphql/cvs/cvs.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";
import { UpdateCvSkillInput } from "@/shared/types/cv-graphql";

export const updateCvSkill = (skill: UpdateCvSkillInput) => {
  getClient().mutate<UpdateCvSkillResponse, UpdateCvSkillRequest>({
    mutation: UPDATE_CV_SKILL,
    variables: { skill },
  });
};
