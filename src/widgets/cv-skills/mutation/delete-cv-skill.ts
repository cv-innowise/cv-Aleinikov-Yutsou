import { DELETE_CV_SKILL } from "@/shared/graphql/cvs/cvs.mutations";
import { getClient } from "@/shared/lib/apollo/apollo-client";
import { DeleteCvInput } from "@/shared/types/cv-graphql";

export const deleteCvSkills = (skill: DeleteCvInput) => {
  getClient().mutate({
    mutation: DELETE_CV_SKILL,
    variables: { skill },
  });
};
