import { ProjectDetails } from "@/widgets/project-details";
import { Suspense } from "react";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

const ProjectPage: React.FC<ProjectPageProps> = async ({ params }) => {
  const { projectId } = await params;

  return (
    <Suspense fallback={<ProjectDetails.Skeleton />}>
      <ProjectDetails projectId={projectId} />
    </Suspense>
  );
};

export default ProjectPage;
