import { CvSkills } from "@/widgets/cv-skills";
import { Suspense } from "react";

interface CvSkillsPageProps {
  params: Promise<{ cvId: string }>;
}

const CvSkillsPage: React.FC<CvSkillsPageProps> = async ({ params }) => {
  const { cvId } = await params;
  return (
    <Suspense fallback={<CvSkills.Skeleton />}>
      <CvSkills cvId={cvId} />
    </Suspense>
  );
};

export default CvSkillsPage;
