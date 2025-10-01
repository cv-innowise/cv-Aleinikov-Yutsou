"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { DialogClose, DialogTitle } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { updateUserSchema } from "../validatiion/update-user.schema";
import { User, UserCv } from "@/shared/graphql/users/users.types";
import { CvItem } from "@/shared/graphql/cvs/cvs.types";
import { Department } from "@/shared/graphql/departments/departments.types";
import { Position } from "@/shared/graphql/positions/positions.types";
import { UserRole } from "@/shared/types/cv-graphql";
import { updateUser } from "../mutations/update-user";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface UpdateUserFormProps {
  user: User;
  freeCvs: CvItem[];
  departments: Department[];
  positions: Position[];
}

export const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  user,
  freeCvs,
  departments,
  positions,
}) => {
  const [isPenging, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("user-form");
  const availableCvs: UserCv[] = [...(user.cvs || []), ...freeCvs];
  const form = useForm<yup.InferType<typeof updateUserSchema>>({
    resolver: yupResolver(updateUserSchema),
    defaultValues: {
      userId: user.id,
      cvsIds: user.cvs?.map((cv) => cv.id),
      positionId: user.position?.id,
      departmentId: user.department?.id,
      role: user.role,
    },
  });

  const onCvToggle = (cv: UserCv) => () => {
    const cvIds = form.getValues().cvsIds;
    if (cvIds.includes(cv.id)) {
      form.setValue(
        "cvsIds",
        cvIds.filter((cvId) => cvId !== cv.id)
      );
    } else {
      form.setValue("cvsIds", [...cvIds, cv.id]);
    }
  };

  const onSubmit = (formData: yup.InferType<typeof updateUserSchema>) => {
    startTransition(async () => {
      const promise = updateUser(formData);

      toast.promise(promise, {
        success: t("user-updated"),
        error: t("error"),
        loading: t("loading"),
      });
      router.refresh();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <DialogTitle>{t("update")}</DialogTitle>
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <Input
              hidden
              {...field}
              value={user.id}
              data-testid="user-id-input"
            />
          )}
        />
        <FormField
          control={form.control}
          name="cvsIds"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col">
                <FormLabel>{t("cvs-label")}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn("w-[200px] justify-between")}
                        data-testid="select-cvs-button"
                      >
                        {t("cvs")}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder={t("search-cvs")}
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>{t("no-cvs")}</CommandEmpty>
                        <CommandGroup>
                          {availableCvs.map((cv) => (
                            <CommandItem
                              value={cv.id}
                              key={cv.id}
                              onSelect={onCvToggle(cv)}
                            >
                              {cv.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  field.value.includes(cv.id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("department-label")}</FormLabel>
                <Select
                  onValueChange={(val) =>
                    field.onChange(val === "none" ? "" : val)
                  }
                  defaultValue={field.value || "none"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("department")}
                        data-testid="select-department-value"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">{t("no-department")}</SelectItem>
                    {departments.map((dep) => (
                      <SelectItem key={dep.id} value={dep.id}>
                        {dep.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="positionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("position-label")}</FormLabel>
                <Select
                  onValueChange={(val) =>
                    field.onChange(val === "none" ? "" : val)
                  }
                  defaultValue={field.value || "none"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("position")}
                        data-testid="select-position-value"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">{t("no-position")}</SelectItem>
                    {positions.map((pos) => (
                      <SelectItem key={pos.id} value={pos.id}>
                        {pos.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{t("role-label")}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row gap-x-4"
                >
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem
                        value={UserRole.Employee}
                        data-testid="employee-radio-item"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("role-employee")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem
                        value={UserRole.Admin}
                        data-testid="admin-radio-item"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("role-admin")}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="float-right space-x-4">
          <DialogClose asChild>
            <Button
              disabled={isPenging}
              type="button"
              variant="outline"
              data-testid="cancel-button"
            >
              {t("cancel")}
            </Button>
          </DialogClose>
          <Button loading={isPenging} type="submit" data-testid="submit-button">
            {t("confirm")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
