import { GET_PROJECT } from "@/shared/graphql/projects/projects.queries";
import { ProjectResponse } from "@/shared/graphql/projects/projects.types";
import { useQuery } from "@apollo/client/react";
import { BreadcrumbSeparator, BreadcrumbItem, BreadcrumbLink } from "@/shared/components/ui/breadcrumb";

interface ProjectCrumbProps {
  id: string;
  href: string;
}

export const ProjectCrumb: React.FC<ProjectCrumbProps> = ({ id, href }) => {
  const { data } = useQuery<ProjectResponse>(GET_PROJECT, {
    variables: { projectId: id },
  });

  const label = data?.project.name || id;
  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
};
