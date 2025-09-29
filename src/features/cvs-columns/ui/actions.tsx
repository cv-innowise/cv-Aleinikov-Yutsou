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
import Link from "next/link";
import { CvItem } from "@/shared/graphql/cvs/cvs.types";
import { deleteCv } from "../mutations/delete-cv";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { CvForm } from "@/features/cv-form";
import { toast } from "sonner";
import { Suspense, useTransition } from "react";
import { useRouter } from "next/navigation";

interface ActionsProps {
  cv: CvItem;
}

export const Actions: React.FC<ActionsProps> = ({ cv }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onDeleteCv = () => {
    startTransition(() => {
      const promise = deleteCv({ cvId: cv.id });

      toast.promise(promise, {
        success: "CV was deleted",
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
          <Link href={`/cvs/${cv.id}`} data-testid="cv-link">
            CV Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger
              data-testid="update-cv-button"
              className="hover:bg-accent hover:text-accent-foreground w-full flex cursor-default rounded-sm px-2 py-1.5 text-sm outline-hidden disabled:pointer-events-none disabled:opacity-50"
              disabled={isPending}
            >
              Update CV
            </DialogTrigger>
            <Suspense>
              <CvForm cvId={cv.id} />
            </Suspense>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AlertDialog>
            <AlertDialogTrigger
              data-testid="delete-cv-button"
              className="text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 hover:text-destructive w-full flex cursor-default rounded-sm px-2 py-1.5 text-sm outline-hidden disabled:pointer-events-none disabled:opacity-50"
              disabled={isPending}
            >
              Delete CV
            </AlertDialogTrigger>
            <AlertDialogContent datat-testid="alert-dialog">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this project and remove the data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-testid="alert-dialog-close">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDeleteCv}
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
