import { CvProjectsList } from "@/widgets/cv-projects-list";
import { Suspense } from "react";

interface CvProjectsPageProps {
  params: Promise<{ cvId: string }>;
}

const CvProjectsPage: React.FC<CvProjectsPageProps> = async ({ params }) => {
  const { cvId } = await params;
  return (
    <Suspense fallback={<CvProjectsList.Skeleton />}>
      <CvProjectsList cvId={cvId} />
    </Suspense>
  );
};

export default CvProjectsPage;
