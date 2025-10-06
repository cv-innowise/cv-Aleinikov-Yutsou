import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/shared/components/ui/alert-dialog";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { ProjectItem } from "@/shared/graphql/projects/projects.types";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { ProjectForm } from "@/features/project-form";
import { Suspense, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetAuthUser } from "@/shared/lib/hooks/use-get-auth-user";
import { UserRole } from "@/shared/types/cv-graphql";
import { useTranslations } from "next-intl";
import { DialogContent } from "@radix-ui/react-dialog";
import { CvProjectForm } from "@/features/cv-project-form/ui/cv-project-form";

interface ActionsProps {
  project: ProjectItem;
}

export const Actions: React.FC<ActionsProps> = ({ project }) => {
  const t = useTranslations("project-actions");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" data-testid="action-button">
          <span className="sr-only">{t("open")}</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger className="hover:bg-accent hover:text-accent-foreground w-full flex cursor-default rounded-sm px-2 py-1.5 text-sm outline-hidden disabled:pointer-events-none disabled:opacity-50">{t("update")}</DialogTrigger>
            <CvProjectForm project={project} />
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AlertDialog>
            <AlertDialogTrigger data-testid="delete-project-button" className="text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 hover:text-destructive w-full flex cursor-default rounded-sm px-2 py-1.5 text-sm outline-hidden disabled:pointer-events-none disabled:opacity-50">
              {t("delete")}
            </AlertDialogTrigger>
            <AlertDialogContent datat-testid="alert-dialog">
              <AlertDialogHeader>
                <AlertDialogTitle>{t("alert-title")}</AlertDialogTitle>
                <AlertDialogDescription>{t("alert-description")}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-testid="alert-dialog-close">{t("cancel")}</AlertDialogCancel>
                <AlertDialogAction data-testid="alert-dialog-confirm">{t("continue")}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
