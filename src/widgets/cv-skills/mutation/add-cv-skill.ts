import { ADD_CV_SKILL } from "@/shared/graphql/cvs/cvs.mutations";
import { AddCvSkillRequest, AddCvSkillResponse } from "@/shared/graphql/cvs/cvs.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";
import { AddCvSkillInput } from "@/shared/types/cv-graphql";

export const addCvSkill = async (skill: AddCvSkillInput) => {
  getClient().mutate<AddCvSkillResponse, AddCvSkillRequest>({
    mutation: ADD_CV_SKILL,
    variables: { skill },
  });
};
