import { DataTable, DataTableSkeleton } from "@/features/data-table";
import { getUsers } from "../queries/get-users";
import { usersColumns } from "@/features/users-columns";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { UserForm } from "@/features/user-form";
import { UserRole } from "@/shared/types/cv-graphql";

export const UsersList = async () => {
  const users = await getUsers();
  const authUser = await getAuthUser();

  return (
    <div>
      <DataTable title="Users" columns={usersColumns} data={users}>
        {authUser.role === UserRole.Admin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="block ml-auto"
                data-testid="create-user-button"
              >
                Create User
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