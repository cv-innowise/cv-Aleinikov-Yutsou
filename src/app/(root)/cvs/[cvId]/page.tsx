import { CvEditForm } from "@/features/cv-edit-form/ui/cv-edit-form";
import { GET_CV } from "@/shared/graphql/cvs/cvs.queries";
import { CvRequest, CvResponse } from "@/shared/graphql/cvs/cvs.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";
import React from "react";

interface CvDetailsPageProps {
  params: { cvId: string };
}

const CvDetailsPage: React.FC<CvDetailsPageProps> = async ({ params }) => {
  const { cvId } = await params;
  const { data } = await getClient().query<CvResponse, CvRequest>({
    query: GET_CV,
    variables: { cvId },
  });
  const cv = data?.cv;

  if (!cv) {
    return <div className="text-3xl">CV not found</div>;
  }

  return (
    <>
      <CvEditForm cv={cv} />
    </>
  );
};

export default CvDetailsPage;
