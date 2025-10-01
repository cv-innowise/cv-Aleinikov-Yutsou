import { DataTable, DataTableSkeleton } from "@/features/data-table";
import { getProjects } from "../queries/get-projects";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { projectsColumns } from "@/features/projects-columns";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { UserRole } from "@/shared/types/cv-graphql";
import { ProjectForm } from "@/features/project-form";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";
import { getTranslations } from "next-intl/server";

export const ProjectsList: FCWithSkeleton<unknown> = async () => {
  const projects = await getProjects();
  const authUser = await getAuthUser();
  const t = await getTranslations("projects-list");
  const isAuthUserAdmin = authUser.role === UserRole.Admin;

  return (
    <div>
      <DataTable
        title={t("projects")}
        columns={projectsColumns}
        data={projects}
      >
        {isAuthUserAdmin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="block ml-auto"
                data-testid="create-project-button"
              >
                {t("create-project")}
              </Button>
            </DialogTrigger>
            <ProjectForm />
          </Dialog>
        )}
      </DataTable>
    </div>
  );
};

ProjectsList.Skeleton = () => {
  return <DataTableSkeleton />;
};

ProjectsList.Skeleton.displayName = "ProjectsList.Skeleton";
