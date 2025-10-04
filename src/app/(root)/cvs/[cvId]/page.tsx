import React from "react";

interface CvDetailsPageProps {
  params: { cvId: string };
}

const CvDetailsPage: React.FC<CvDetailsPageProps> = async ({ params }) => {
  const { cvId } = await params;

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">CV Details Page - CV ID: {cvId}</div>
    </>
  );
};

export default CvDetailsPage;
