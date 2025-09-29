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

interface DepartmentFormProps {
  departmentId?: Department["id"];
}

export const DepartmentForm: React.FC<DepartmentFormProps> = ({
  departmentId,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const department = useGetDepartment(departmentId);
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
          ? "Department was updated"
          : " Department was created",
        error: "Something went wrong",
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
            {department ? "Update Department" : "Create Department"}
          </DialogTitle>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Department name" {...field} />
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
