import { DataTable, DataTableSkeleton } from "@/features/data-table";
import { getUsers } from "../queries/get-users";
import { usersColumns } from "@/features/users-columns";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { UserForm } from "@/features/user-form";
import { UserRole } from "@/shared/types/cv-graphql";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";
import { getTranslations } from "next-intl/server";

export const UsersList: FCWithSkeleton<unknown> = async () => {
  const users = await getUsers();
  const authUser = await getAuthUser();
  const t = await getTranslations("users-list");

  return (
    <div>
      <DataTable title={t("users")} columns={usersColumns} data={users}>
        {authUser.role === UserRole.Admin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="block ml-auto"
                data-testid="create-user-button"
              >
                {t("create-user")}
              </Button>
            </DialogTrigger>
            <UserForm />
          </Dialog>
        )}
      </DataTable>
    </div>
  );
};

UsersList.Skeleton = () => {
  return <DataTableSkeleton />;
};

UsersList.Skeleton.displayName = "UsersList.Skeleton";
