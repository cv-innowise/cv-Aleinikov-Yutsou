import { ProjectsList } from "@/widgets/projects-list";
import { Suspense } from "react";

export const metadata = {
  title: "Projects List",
  description: "Browse and manage projects.",
  keywords: ["projects", "company", "CV Platform"],
};

const ProjectsPage = () => {
  return (
    <Suspense fallback={<ProjectsList.Skeleton />}>
      <ProjectsList />
    </Suspense>
  );
};

export default ProjectsPage;
