import { ProjectsList } from "@/widgets/projects-list";
import { Suspense } from "react";

const ProjectsPage = () => {
  return (
    <Suspense fallback={<ProjectsList.Skeleton />}>
      <ProjectsList />
    </Suspense>
  );
};

export default ProjectsPage;
