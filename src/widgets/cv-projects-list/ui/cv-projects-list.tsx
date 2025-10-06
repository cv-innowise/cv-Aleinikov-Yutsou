import { cvProjectsColumns } from "@/features/cv-projects-columns";
import { DataTable, DataTableSkeleton } from "@/features/data-table";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { getCv } from "@/shared/lib/queries/get-cv";
import { UserRole } from "@/shared/types/cv-graphql";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";
import { getTranslations } from "next-intl/server";

interface CvProjectsListProps {
  cvId: string;
}

export const CvProjectsList: FCWithSkeleton<CvProjectsListProps> = async ({ cvId }) => {
  const cv = await getCv(cvId);
  const cvProjects = cv?.projects || [];
  console.log(cvProjects[0]);

  const authUser = await getAuthUser();
  const t = await getTranslations("cv.projects");

  const isCanAddNew = authUser.role === UserRole.Admin || authUser.id === cv?.user?.id;

  return (
    <div className="w-full">
      <DataTable title={t("title")} columns={cvProjectsColumns} data={cvProjects}>
        {isCanAddNew && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="block ml-auto">{t("addNewButton")}</Button>
            </DialogTrigger>
          </Dialog>
        )}
      </DataTable>
    </div>
  );
};

CvProjectsList.Skeleton = () => {
  return (
    <div className="w-full">
      <DataTableSkeleton />
    </div>
  );
};

CvProjectsList.Skeleton.displayName = "CvProjectsList.Skeleton";
