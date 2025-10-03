import { GET_CVS } from "@/shared/graphql/cvs/cvs.queries";
import { CvItem, CvsResponse } from "@/shared/graphql/cvs/cvs.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";

export const getCvs = async (): Promise<CvItem[]> => {
  const { data } = await getClient().query<CvsResponse>({
    query: GET_CVS,
    fetchPolicy: "network-only",
  });
  
  return data?.cvs ?? [];
};
