import { GET_CVS } from "@/shared/graphql/cvs/cvs.queries";
import { CvsResponse } from "@/shared/graphql/cvs/cvs.types";
import { useSuspenseQuery } from "@apollo/client/react";

export const useGetFreeCvs = () => {
  const { data } = useSuspenseQuery<CvsResponse>(GET_CVS);
  return data.cvs.filter((cv) => cv.user);
};
