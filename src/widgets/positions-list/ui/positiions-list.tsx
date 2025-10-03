import { DataTable, DataTableSkeleton } from "@/features/data-table";
import { getPositions } from "../../../shared/lib/queries/get-positions";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { positionsColumns } from "@/features/positions-columns";
import { UserRole } from "@/shared/types/cv-graphql";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { PositionForm } from "@/features/position-form";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";
import { getTranslations } from "next-intl/server";

export const PositionsList: FCWithSkeleton<unknown> = async () => {
  const positions = await getPositions();
  const authUser = await getAuthUser();
  const t = await getTranslations("positions-list");
  const isAuthUserAdmin = authUser.role === UserRole.Admin;

  return (
    <div>
      <DataTable title={t("positions")} columns={positionsColumns} data={positions}>
        {isAuthUserAdmin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="block ml-auto"
                data-testid="create-position-button"
              >
                {t("create-position")}
              </Button>
            </DialogTrigger>
            <PositionForm />
          </Dialog>
        )}
      </DataTable>
    </div>
  );
};

PositionsList.Skeleton = () => {
  return <DataTableSkeleton />;
};

PositionsList.Skeleton.displayName = "PositionsList.Skeleton";
