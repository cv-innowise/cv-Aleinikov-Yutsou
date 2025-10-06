import { CvEditForm } from "@/features/cv-edit-form/ui/cv-edit-form";
import { getCv } from "@/shared/lib/queries/get-cv";
import React from "react";

interface CvDetailsPageProps {
  params: { cvId: string };
}

const CvDetailsPage: React.FC<CvDetailsPageProps> = async ({ params }) => {
  const { cvId } = await params;
  const cv = await getCv(cvId);

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
