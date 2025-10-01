import { DataTable, DataTableSkeleton } from "@/features/data-table";
import { getLanguages } from "../../../shared/lib/queries/get-languages";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { languagesColumns } from "@/features/languages-columns";
import { UserRole } from "@/shared/types/cv-graphql";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { LanguageForm } from "@/features/language-form";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";
import { getTranslations } from "next-intl/server";

export const LanguagesList: FCWithSkeleton<unknown> = async () => {
  const languages = await getLanguages();
  const authUser = await getAuthUser();
  const t = await getTranslations("languages-list");
  const isAuthUserAdmin = authUser.role === UserRole.Admin;

  return (
    <div>
      <DataTable title={t("languages")} columns={languagesColumns} data={languages}>
        {isAuthUserAdmin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="block ml-auto"
                data-testid="create-language-button"
              >
                {t("create")}
              </Button>
            </DialogTrigger>
            <LanguageForm />
          </Dialog>
        )}
      </DataTable>
    </div>
  );
};

LanguagesList.Skeleton = () => {
  return <DataTableSkeleton />;
};

LanguagesList.Skeleton.displayName = "LanguagesList.Skeleton";
