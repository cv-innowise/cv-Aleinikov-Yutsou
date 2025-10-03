import { Project, UserRole } from "@/shared/types/cv-graphql";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";
import { getProject } from "../queries/get-project";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { ProjectForm } from "@/features/project-form";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface ProjectDetailsProps {
  projectId: Project["id"];
}

export const ProjectDetails: FCWithSkeleton<ProjectDetailsProps> = async ({
  projectId,
}) => {
  const authUser = await getAuthUser();
  const project = await getProject(projectId);
  const tNotFound = await getTranslations("not-found");
  const tProject = await getTranslations("project-details");
  const isAuthUserAdmin = authUser.role === UserRole.Admin;

  if (!project) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h2 className="text-4xl">{tNotFound("project-not-found")}</h2>
        <Button variant="link" asChild>
          <Link className="underline" href={`/users/${authUser.id}/profile`}>
            {tNotFound("projects")}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-y-2">
      <h2 className="text-4xl font-bold">
        {project.name} {project.internal_name && `(${project.internal_name})`}
      </h2>
      <h3 className="text-lg font-bold">{project.domain}</h3>
      <span className="text-xs text-muted-foreground">
        {project.start_date} - {project.end_date ?? tProject("till-now")}
      </span>
      <div className="flex flex-wrap gap-x-2">
        {project.environment.map((item) => (
          <span className="p-1 text-sm rounded-lg border-primary border-1 shadow-sm">
            {item}
          </span>
        ))}
      </div>
      <p>{project.description}</p>
      {isAuthUserAdmin && (
        <Dialog>
          <DialogTrigger asChild>
            <Button data-testid="update-project-button">
              {tProject("update-project")}
            </Button>
          </DialogTrigger>
          <ProjectForm projectId={projectId} />
        </Dialog>
      )}
    </div>
  );
};

ProjectDetails.Skeleton = () => {
  return (
    <div className="flex flex-col items-start gap-y-2">
      <Skeleton className="w-[400px] h-[40px]" />
      <Skeleton className="w-[150px] h-[28px]" />
      <Skeleton className="w-[130px] h-[16px]" />
      <div className="flex flex-wrap gap-x-2">
        <Skeleton className="w-[60px] h-[30px]" />
        <Skeleton className="w-[90px] h-[30px]" />
        <Skeleton className="w-[40px] h-[30px]" />
        <Skeleton className="w-[50px] h-[30px]" />
      </div>
      <Skeleton className="w-[600px] h-[200px]" />
    </div>
  );
};

ProjectDetails.Skeleton.displayName = "ProjectDetails.Skeleton";
