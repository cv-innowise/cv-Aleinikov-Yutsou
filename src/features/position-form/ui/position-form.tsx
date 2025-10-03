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
import { useTranslations } from "next-intl";

interface PositionFormProps {
  positionId?: Position["id"];
}

export const PositionForm: React.FC<PositionFormProps> = ({ positionId }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const position = useGetPosition(positionId);
    const t = useTranslations("position-form");
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
        success: position ? t("position-updated") : t("position-created"),
        error: t("error"),
        loading: t("loading"),
      });
      router.refresh();
    });
  };

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <DialogTitle>{position ? t("update") : t("create")}</DialogTitle>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name-label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("name")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="float-right space-x-4">
            <DialogClose asChild>
              <Button disabled={isPending} type="button" variant="outline">
                {t("cancel")}
              </Button>
            </DialogClose>
            <Button loading={isPending} type="submit">
              {t("confirm")}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
