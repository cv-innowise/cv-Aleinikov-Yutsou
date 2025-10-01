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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Skill } from "@/shared/graphql/skills/skills.types";
import { createSkill } from "../mutations/create-skill";
import { updateSkill } from "../mutations/update-skill";
import { useGetSkill } from "../queries/use-get-skill";
import { useGetSkillCategories } from "../queries/use-get-skill-categories";
import { skillSchema } from "../validation/skill.schema";
import { Input } from "@/shared/components/ui/input";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface SkillFormProps {
  skillId?: Skill["id"];
}

export const SkillForm: React.FC<SkillFormProps> = ({ skillId }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
    const t = useTranslations("skill-form");
  const skill = useGetSkill(skillId);
  const skillCategories = useGetSkillCategories();
  const skillCategoryId = skillCategories.find(
    (cat) => cat.name === skill?.category_name
  )?.id;
  const form = useForm<yup.InferType<typeof skillSchema>>({
    resolver: yupResolver(skillSchema),
    defaultValues: {
      name: skill?.name,
      categoryId: skillCategoryId,
    },
  });

  const onSubmit = (formData: yup.InferType<typeof skillSchema>) => {
    startTransition(async () => {
      let promise: Promise<unknown>;
      if (skill) {
        promise = updateSkill({ skillId: skill.id, ...formData });
      } else {
        promise = createSkill(formData);
      }

      toast.promise(promise, {
        success: skill ? t("skill-updated") : t("skill-created"),
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
          <DialogTitle>{skill ? t("update") : t("create")}</DialogTitle>
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("category-label")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("category")}
                          data-testid="select-category-value"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skillCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
