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

interface ActionsProps {
  user: UserItem;
}

export const Actions: React.FC<ActionsProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const authUser = useGetAuthUser();
  const isAuthUserAdmin = authUser.role === UserRole.Admin;

  const onDeleteUser = () => {
    startTransition(async () => {
      const promise = deleteUser({ userId: user.id });

      toast.promise(promise, {
        success: "User was deleted",
        error: "Something went wrong",
        loading: "Loading...",
      });
      router.refresh();
    });
  };

  if (!isAuthUserAdmin && authUser.id !== user.id) {
    return (
      <Button variant="ghost" className="h-8 w-8 p-0" asChild>
        <Link href={`/users/${user.id}/profile`}>
          <span className="sr-only">Open menu</span>
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
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/users/${user.id}/profile`} data-testid="profile-link">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger
              disabled={!isAuthUserAdmin || isPending}
              data-testid="update-user-button"
              className="hover:bg-accent hover:text-accent-foreground w-full flex cursor-default rounded-sm px-2 py-1.5 text-sm outline-hidden disabled:pointer-events-none disabled:opacity-50"
            >
              Update User
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
              Delete user
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this user and remove the data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-testid="alert-dialog-close">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDeleteUser}
                  data-testid="alert-dialog-confirm"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
