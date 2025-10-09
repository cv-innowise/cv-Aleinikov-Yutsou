import { CvPreview } from "@/widgets/cv-preview";

interface CvPreviewPageProps {
  params: Promise<{ cvId: string }>;
}

const CvPreviewPage: React.FC<CvPreviewPageProps> = async ({ params }) => {
  const { cvId } = await params;

  return <CvPreview cvId={cvId} />;
};

export default CvPreviewPage;
