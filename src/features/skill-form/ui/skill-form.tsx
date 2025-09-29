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

interface SkillFormProps {
  skillId?: Skill["id"];
}

export const SkillForm: React.FC<SkillFormProps> = ({ skillId }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
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
        success: skill ? "Skill was updated" : "Skill was created",
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
          <DialogTitle>{skill ? "Update Skill" : "Create Skill"}</DialogTitle>
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Skill name" {...field} />
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
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select category"
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
