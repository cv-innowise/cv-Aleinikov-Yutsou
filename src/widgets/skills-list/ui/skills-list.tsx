import { DataTable, DataTableSkeleton } from "@/features/data-table";
import { skillsColumns } from "@/features/skills-columns";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { UserRole } from "@/shared/types/cv-graphql";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { SkillForm } from "@/features/skill-form";
import { getSkills } from "@/shared/lib/queries/get-skills";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";

export const SkillsList: FCWithSkeleton<unknown> = async () => {
  const skills = await getSkills();
  const authUser = await getAuthUser();
  const isAuthUserAdmin = authUser.role === UserRole.Admin;

  return (
    <div>
      <DataTable title="Skills" columns={skillsColumns} data={skills}>
        {isAuthUserAdmin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="block ml-auto"
                data-testid="create-skill-button"
              >
                Create Skill
              </Button>
            </DialogTrigger>
            <SkillForm />
          </Dialog>
        )}
      </DataTable>
    </div>
  );
};

SkillsList.Skeleton = () => {
  return <DataTableSkeleton />;
};

SkillsList.Skeleton.displayName = "SkillsList.Skeleton";