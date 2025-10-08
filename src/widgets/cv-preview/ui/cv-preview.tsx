import { getCv } from "@/shared/lib/queries/get-cv";
import { CvProfileInfo } from "./cv-profile-info";

interface CvPreviewProps {
  cvId: string;
}

export const CvPreview = async ({ cvId }: CvPreviewProps) => {
  const cv = await getCv(cvId);

  return (
    <div>
      <CvProfileInfo cv={cv} />
    </div>
  );
};
