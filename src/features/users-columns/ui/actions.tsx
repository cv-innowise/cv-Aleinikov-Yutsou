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
import { ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { UserItem } from "@/shared/graphql/users/users.types";
import { UserRole } from "@/shared/types/cv-graphql";
import { deleteUser } from "../mutations/delete-user";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { UserForm } from "@/features/user-form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetAuthUser } from "@/shared/lib/hooks/use-get-auth-user";
import { Suspense } from "react";
import { useTranslations } from "next-intl";

interface ActionsProps {
  user: UserItem;
}

export const Actions: React.FC<ActionsProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const authUser = useGetAuthUser();
    const t = useTranslations("user-actions");
  const isAuthUserAdmin = authUser.role === UserRole.Admin;

  const onDeleteUser = () => {
    startTransition(async () => {
      const promise = deleteUser({ userId: user.id });

      toast.promise(promise, {
        success: t("user-deleted"),
        error: t("error"),
        loading: t("loading"),
      });
      router.refresh();
    });
  };

  if (!isAuthUserAdmin && authUser.id !== user.id) {
    return (
      <Button variant="ghost" className="h-8 w-8 p-0" asChild>
        <Link
          href={`/users/${user.id}/profile`}
          data-testid="profile-link-icon"
        >
          <span className="sr-only">{t("open")}</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    );
  }

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
          <Link href={`/users/${user.id}/profile`} data-testid="profile-link">
            {t("profile")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger
              disabled={isPending}
              data-testid="update-user-button"
              className="hover:bg-accent hover:text-accent-foreground w-full flex cursor-default rounded-sm px-2 py-1.5 text-sm outline-hidden disabled:pointer-events-none disabled:opacity-50"
            >
              {t("update")}
            </DialogTrigger>
            <Suspense>
              <UserForm userId={user.id} />
            </Suspense>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AlertDialog>
            <AlertDialogTrigger
              disabled={!isAuthUserAdmin || isPending}
              data-testid="delete-user-button"
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
                  onClick={onDeleteUser}
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
