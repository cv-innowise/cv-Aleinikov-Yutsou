import { DataTable, DataTableSkeleton } from "@/features/data-table";
import { getDepartments } from "../../../shared/lib/queries/get-departments";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { departmentsColumns } from "@/features/departments-columns";
import { UserRole } from "@/shared/types/cv-graphql";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { DepartmentForm } from "@/features/department-form";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";

export const DepartmentsList: FCWithSkeleton<unknown> = async () => {
  const departments = await getDepartments();
  const authUser = await getAuthUser();
  const isAuthUserAdmin = authUser.role === UserRole.Admin;

  return (
    <div>
      <DataTable
        title="Departments"
        columns={departmentsColumns}
        data={departments}
      >
        {isAuthUserAdmin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="block ml-auto"
                data-testid="create-department-button"
              >
                Create Department
              </Button>
            </DialogTrigger>
            <DepartmentForm />
          </Dialog>
        )}
      </DataTable>
    </div>
  );
};

DepartmentsList.Skeleton = () => {
  return <DataTableSkeleton />;
};

DepartmentsList.Skeleton.displayName = "DepartmentsList.Skeleton";
