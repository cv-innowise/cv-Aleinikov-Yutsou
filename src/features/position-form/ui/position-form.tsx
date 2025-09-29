"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/shared/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Position } from "@/shared/graphql/positions/positions.types";
import { useGetPosition } from "../queries/use-get-position";
import { createPosition } from "../mutations/create-position";
import { updatePosition } from "../mutations/update-position";
import { positionSchema } from "../validation/position.schema";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PositionFormProps {
  positionId?: Position["id"];
}

export const PositionForm: React.FC<PositionFormProps> = ({ positionId }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const position = useGetPosition(positionId);
  const form = useForm<yup.InferType<typeof positionSchema>>({
    resolver: yupResolver(positionSchema),
    defaultValues: {
      name: position?.name,
    },
  });

  const onSubmit = (formData: yup.InferType<typeof positionSchema>) => {
    startTransition(async () => {
      let promise: Promise<unknown>;
      if (position) {
        promise = updatePosition({ positionId: position.id, ...formData });
      } else {
        promise = createPosition(formData);
      }

      toast.promise(promise, {
        success: position ? "Position was updated" : "Position was created",
        error: "Soething went wrong",
        loading: "Loading...",
      });
      router.refresh();
    });
  };

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <DialogTitle>
            {position ? "Update Position" : "Create Position"}
          </DialogTitle>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Position name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="float-right space-x-4">
            <DialogClose asChild>
              <Button disabled={isPending} type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button loading={isPending} type="submit">
              Confirm
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
