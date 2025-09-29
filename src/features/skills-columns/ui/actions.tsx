import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
import { Skill } from "@/shared/graphql/skills/skills.types";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { SkillForm } from "@/features/skill-form";
import { deleteSkill } from "../mutations/delete-skill";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetAuthUser } from "@/shared/lib/hooks/use-get-auth-user";
import { UserRole } from "@/shared/types/cv-graphql";
import { Suspense } from "react";

interface ActionsProps {
  skill: Skill;
}

export const Actions: React.FC<ActionsProps> = ({ skill }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const authUser = useGetAuthUser();
  const isAuthUserAdmin = authUser.role === UserRole.Admin;

  const onDeleteSkill = () => {
    startTransition(async () => {
      const promise = deleteSkill({ skillId: skill.id });

      toast.promise(promise, {
        success: "Skill was deleted",
        error: "Something went wrong",
        loading: "Loading...",
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
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger
              disabled={!isAuthUserAdmin || isPending}
              data-testid="update-skill-button"
              className="hover:bg-accent hover:text-accent-foreground w-full flex cursor-default rounded-sm px-2 py-1.5 text-sm outline-hidden disabled:pointer-events-none disabled:opacity-50"
            >
              Update Skill
            </DialogTrigger>
            <Suspense>
              <SkillForm skillId={skill.id} />
            </Suspense>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AlertDialog>
            <AlertDialogTrigger
              disabled={!isAuthUserAdmin || isPending}
              data-testid="delete-skill-button"
              className="text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 hover:text-destructive w-full flex cursor-default rounded-sm px-2 py-1.5 text-sm outline-hidden disabled:pointer-events-none disabled:opacity-50"
            >
              Delete Skill
            </AlertDialogTrigger>
            <AlertDialogContent datat-testid="alert-dialog">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this skill and remove the data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-testid="alert-dialog-close">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDeleteSkill}
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
