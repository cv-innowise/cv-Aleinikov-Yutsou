import { DataTable, DataTableSkeleton } from "@/features/data-table";
import { getCvs } from "../queries/get-cvs";
import { cvsColumns } from "@/features/cvs-columns";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { CvForm } from "@/features/cv-form";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";
import { getTranslations } from "next-intl/server";

export const CvsList: FCWithSkeleton<unknown> = async () => {
  const cvs = await getCvs();
  const t = await getTranslations("cvs-list");

  return (
    <div>
      <DataTable title={t("cvs")} columns={cvsColumns} data={cvs}>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="block ml-auto" data-testid="create-cv-button">
              {t("create-cv")}
            </Button>
          </DialogTrigger>
          <CvForm />
        </Dialog>
      </DataTable>
    </div>
  );
};

CvsList.Skeleton = () => {
  return <DataTableSkeleton />;
};

CvsList.Skeleton.displayName = "CvsList.Skeleton";
