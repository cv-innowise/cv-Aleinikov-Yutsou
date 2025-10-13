import { GET_PROJECT } from "@/shared/graphql/projects/projects.queries";
import {
  ProjectRequest,
  ProjectResponse,
} from "@/shared/graphql/projects/projects.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";
import { ProjectDetails } from "@/widgets/project-details";
import { Metadata } from "next";
import { Suspense } from "react";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const { data } = await getClient().query<ProjectResponse, ProjectRequest>({
    query: GET_PROJECT,
    variables: { projectId },
  });

  if (!data) {
    return {
      title: "Project Not Found",
      description: "The requested project does not exist.",
      keywords: ["project", "not found", "CV Platform"],
    };
  }

  return {
    title: `Project ${data.project.name}`,
    description: data.project.description,
    keywords: [
      "project",
      "projects",
      "CV Platform",
      "management",
      ...data.project.environment,
    ],
  };
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
