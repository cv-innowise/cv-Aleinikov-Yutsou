import { useSuspenseQuery } from "@apollo/client/react";
import { Cv, CvRequest, CvResponse } from "@/shared/graphql/cvs/cvs.types";
import { GET_CV } from "@/shared/graphql/cvs/cvs.queries";

export const useGetCv = (cvId?: Cv["id"]) => {
  if (!cvId) {
    return;
  }
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useSuspenseQuery<CvResponse,CvRequest >(GET_CV, {variables: {cvId}});

  return data.cv;
}