import { CvPreview } from "@/widgets/cv-preview";
import { Suspense } from "react";

interface CvPreviewPageProps {
  params: Promise<{ cvId: string }>;
}

const CvPreviewPage: React.FC<CvPreviewPageProps> = async ({ params }) => {
  const { cvId } = await params;

  return (
    <Suspense fallback={<CvPreview.Skeleton />}>
      <CvPreview cvId={cvId} />
    </Suspense>
  );
};

export default CvPreviewPage;
