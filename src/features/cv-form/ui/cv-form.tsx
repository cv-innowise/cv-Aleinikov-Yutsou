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
import { Cv } from "@/shared/graphql/cvs/cvs.types";
import { useGetCv } from "../queries/use-get-cv";
import { createCv } from "../mutations/create-cv";
import { updateCv } from "../mutations/update-cv";
import { cvSchema } from "../validation/cv.schema";
import { Textarea } from "@/shared/components/ui/textarea";
import { useGetAuthUser } from "@/shared/lib/hooks/use-get-auth-user";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface CvFormProps {
  cvId?: Cv["id"];
}

export const CvForm: React.FC<CvFormProps> = ({ cvId }) => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const cv = useGetCv(cvId);
  const authUser = useGetAuthUser();
  const t = useTranslations("cv-form");
  const form = useForm<yup.InferType<typeof cvSchema>>({
    resolver: yupResolver(cvSchema),
    defaultValues: {
      name: cv?.name,
      education: cv?.education,
      description: cv?.description,
    },
  });

  const onSubmit = (formData: yup.InferType<typeof cvSchema>) => {
    startTransition(async () => {
      let promise: Promise<unknown>;
      if (cv) {
        promise = updateCv({ cvId: cv.id, ...formData });
      } else {
        promise = createCv({ userId: authUser.id, ...formData });
      }

      toast.promise(promise, {
        success: cv ? t("cv-updated") : t("cv-created"),
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
          <DialogTitle>{cv ? t("update") : t("create")}</DialogTitle>
          <div className="flex flex-col md:flex-row gap-x-4 gap-y-2 justify-between">
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
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("education-label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("education")}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("description-label")}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t("description")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="float-right space-x-4">
            <DialogClose asChild>
              <Button disabled={isLoading} type="button" variant="outline">
                {t("cancel")}
              </Button>
            </DialogClose>
            <Button loading={isLoading} type="submit">
              {t("confirm")}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
