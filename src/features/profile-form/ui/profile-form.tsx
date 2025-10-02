"use client";

import * as yup from "yup";
import { Profile } from "@/shared/graphql/profile/profile.types";
import { User } from "@/shared/graphql/users/users.types";
import { updateProfileSchema } from "../validation/update-profile.schema";
import { useForm } from "react-hook-form";
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
import { Input } from "@/shared/components/ui/input";
import { Position } from "@/shared/graphql/positions/positions.types";
import { Department } from "@/shared/graphql/departments/departments.types";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "../mutations/update-user";
import { updateProfile } from "../mutations/update-profile";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { useTranslations } from "next-intl";

interface ProfileFormProps {
  profile: Profile;
  user: User;
  departments: Department[];
  positions: Position[];
  isEditable: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  user,
  departments,
  positions,
  isEditable,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("profile-form");
  const form = useForm<yup.InferType<typeof updateProfileSchema>>({
    defaultValues: {
      userId: user.id,
      profile: { first_name: profile.first_name, last_name: profile.last_name },
      user: {
        departmentId: user.department?.id ?? "",
        positionId: user.position?.id ?? "",
        role: user.role,
      },
    },
  });

  const onSubmit = ({
    userId,
    user: formUser,
    profile: formProfile,
  }: yup.InferType<typeof updateProfileSchema>) => {
    if (!form.formState.isDirty) {
      toast.error(t("nothing-changed"));
      return;
    }

    startTransition(async () => {
      const promises: Promise<unknown>[] = [];

      if (form.formState.dirtyFields.user) {
        promises.push(updateUser({ userId, ...formUser }));
      }

      if (form.formState.dirtyFields.profile) {
        promises.push(updateProfile({ userId, ...formProfile }));
      }

      const promise = Promise.all(promises);

      toast.promise(promise, {
        success: t("profile-updated"),
        error: t("error"),
        loading: t("loading"),
      });
      form.reset({ userId, profile: formProfile, user: formUser });
      router.refresh();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="userId"
          disabled={!isEditable}
          render={({ field }) => (
            <Input
              {...field}
              hidden
              value={user.id}
              data-testid="user-id-input"
            />
          )}
        />
        <FormField
          control={form.control}
          name="user.role"
          disabled={!isEditable}
          render={({ field }) => (
            <Input
              {...field}
              hidden
              value={user.id}
              data-testid="user-role-input"
            />
          )}
        />
        <div className="flex gap-x-4 justify-between">
          <FormField
            control={form.control}
            name="profile.first_name"
            disabled={!isEditable}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("first-name")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("first-name")}
                    value={field.value || ""}
                    data-testid="user-first-name-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profile.last_name"
            disabled={!isEditable}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("last-name")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("last-name")}
                    value={field.value || ""}
                    data-testid="user-last-name-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-x-4 ">
          <FormField
            control={form.control}
            name="user.departmentId"
            render={({ field }) => (
              <FormItem className="grow w-1">
                <FormLabel>{t("department")}</FormLabel>
                <Select
                  onValueChange={(val) =>
                    field.onChange(val === "none" ? "" : val)
                  }
                  defaultValue={field.value || "none"}
                  disabled={!isEditable}
                >
                  <FormControl>
                    <SelectTrigger className="w-full" disabled={!isEditable}>
                      <SelectValue
                        placeholder="Select department"
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
            name="user.positionId"
            render={({ field }) => (
              <FormItem className="grow w-1">
                <FormLabel>{t("position")}</FormLabel>
                <Select
                  onValueChange={(val) =>
                    field.onChange(val === "none" ? "" : val)
                  }
                  defaultValue={field.value || "none"}
                  disabled={!isEditable}
                >
                  <FormControl>
                    <SelectTrigger className="w-full" disabled={!isEditable}>
                      <SelectValue
                        placeholder="Select position"
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
        {isEditable && (
          <Button
            type="submit"
            disabled={isPending}
            className="block ml-auto"
            data-testid="update-button"
          >
            {t("update")}
          </Button>
        )}
      </form>
    </Form>
  );
};
