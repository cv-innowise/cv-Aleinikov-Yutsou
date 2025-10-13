"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Cv } from "@/shared/graphql/cvs/cvs.types";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { cvUpdateSchema } from "../validation/cv-update.schema";
import type { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateCv } from "@/features/cv-form/mutations/update-cv";
import { toast } from "sonner";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { useTransition } from "react";

interface CvEditFormProps {
  cv: Cv;
}
type FormValues = InferType<typeof cvUpdateSchema>;

export const CvEditForm: React.FC<CvEditFormProps> = ({ cv }) => {
  const t = useTranslations("cv.editForm");
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: yupResolver(cvUpdateSchema),
    defaultValues: {
      description: cv.description,
      education: cv.education,
      name: cv.name,
    },
  });

  const onSubmit = (formData: FormValues) => {
    startTransition(() => {
      updateCv({ cvId: cv.id, ...formData })
        .then(() => {
          toast.success(t("updateSuccess"));
          form.reset(formData);
        })
        .catch(() => {
          toast.error(t("updateError"));
        });
    });
  };
  return (
    <Form {...form}>
      <form className="space-y-6 max-w-3xl w-full flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("nameLabel")}</FormLabel>
              <FormControl>
                <Input type="text" placeholder={t("nameLabel")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("educationLabel")}</FormLabel>
              <FormControl>
                <Input type="text" placeholder={t("educationLabel")} {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("descriptionLabel")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("descriptionLabel")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button loading={isPending} disabled={!form.formState.isDirty} className="self-end-safe" type="submit">
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
};
