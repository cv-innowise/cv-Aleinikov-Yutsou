import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { MoreHorizontal } from "lucide-react";
import { Language } from "@/shared/graphql/languages/languages.types";
import { deleteLanguage } from "../mutations/delete-language";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { LanguageForm } from "@/features/language-form";
import { Suspense, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetAuthUser } from "@/shared/lib/hooks/use-get-auth-user";
import { UserRole } from "@/shared/types/cv-graphql";
import { useTranslations } from "next-intl";

interface ActionsProps {
  language: Language;
}

export const Actions: React.FC<ActionsProps> = ({
  language,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const authUser = useGetAuthUser();
  const t = useTranslations("language-actions");
  const isAuthUserAdmin = authUser.role === UserRole.Admin;

  const onDeleteLanguage = () => {
    startTransition(async () => {
      const promise = deleteLanguage({ languageId: language.id });

      toast.promise(promise, {
        success: t("language-deleted"),
        error: t("error"),
        loading: t("loading"),
      });
      router.refresh();
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          data-testid="action-button"
        >
          <span className="sr-only">{t("open")}</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger
              disabled={!isAuthUserAdmin || isPending}
              data-testid="update-language-button"
              className="hover:bg-accent hover:text-accent-foreground w-full flex cursor-default rounded-sm px-2 py-1.5 text-sm outline-hidden disabled:pointer-events-none disabled:opacity-50"
            >
              {t("update")}
            </DialogTrigger>
            <Suspense>
              <LanguageForm languageId={language.id} />
            </Suspense>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AlertDialog>
            <AlertDialogTrigger
              disabled={!isAuthUserAdmin || isPending}
              data-testid="delete-language-button"
              className="text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 hover:text-destructive w-full flex cursor-default rounded-sm px-2 py-1.5 text-sm outline-hidden disabled:pointer-events-none disabled:opacity-50"
            >
              {t("delete")}
            </AlertDialogTrigger>
            <AlertDialogContent datat-testid="alert-dialog">
              <AlertDialogHeader>
                <AlertDialogTitle>{t("alert-title")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("alert-description")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-testid="alert-dialog-close">
                  {t("cancel")}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDeleteLanguage}
                  data-testid="alert-dialog-confirm"
                >
                  {t("continue")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
