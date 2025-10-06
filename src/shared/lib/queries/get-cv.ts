import { query } from "../apollo/apollo-client";
import { CvRequest, CvResponse } from "@/shared/graphql/cvs/cvs.types";

import { GET_CV } from "@/shared/graphql/cvs/cvs.queries";

export const getCv = async (cvId: string) => {
  const { data } = await query<CvResponse, CvRequest>({
    query: GET_CV,
    variables: { cvId },
  });

  return data?.cv;
};
