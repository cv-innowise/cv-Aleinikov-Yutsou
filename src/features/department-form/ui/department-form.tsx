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
import { Department } from "@/shared/graphql/departments/departments.types";
import { useGetDepartment } from "../queries/use-get-department";
import { createDepartment } from "../mutations/create-department";
import { updateDepartment } from "../mutations/update-department";
import { departmentSchema } from "../validation/department.schema";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface DepartmentFormProps {
  departmentId?: Department["id"];
}

export const DepartmentForm: React.FC<DepartmentFormProps> = ({
  departmentId,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const department = useGetDepartment(departmentId);
  const t = useTranslations("department-form");
  const form = useForm<yup.InferType<typeof departmentSchema>>({
    resolver: yupResolver(departmentSchema),
    defaultValues: {
      name: department?.name,
    },
  });

  const onSubmit = (formData: yup.InferType<typeof departmentSchema>) => {
    startTransition(async () => {
      let promise: Promise<unknown>;
      if (department) {
        promise = updateDepartment({
          departmentId: department.id,
          ...formData,
        });
      } else {
        promise = createDepartment(formData);
      }

      toast.promise(promise, {
        success: department
          ? t("department-updated")
          : t("department-created"),
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
          <DialogTitle>
            {department ? t("update") : t("create")}
          </DialogTitle>
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
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
              >
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
