import { ExportPdfButton } from "@/features/export-pdf";
import { CvPreview } from "@/widgets/cv-preview";
import { getTranslations } from "next-intl/server";

interface CvPreviewPageProps {
  params: Promise<{ cvId: string }>;
}

const CvPreviewPage: React.FC<CvPreviewPageProps> = async ({ params }) => {
  const { cvId } = await params;
  const t = await getTranslations("cv.preview");

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-end">
        <ExportPdfButton>{t("export")}</ExportPdfButton>
      </div>
      <CvPreview cvId={cvId} />
    </div>
  );
};

export default CvPreviewPage;
