"use client";

import { Mastery, SkillMastery } from "@/shared/types/cv-graphql";
import {
  Deletable,
  DeletableContent,
  DeletableItem,
  DeletableTrigger,
} from "@/features/deletable";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { SkillItem } from "@/entity/skill-item";
import { useGetSkillsByCategories } from "@/shared/lib/hooks/use-get-skills-by-categories";
import { SkillsPreviewProps } from "../types";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const EditableSkillsPreview: React.FC<SkillsPreviewProps> = ({
  skills,
  skillsByCategories,
  categories,
  addSkill,
  updateSkill,
  deleteSkill,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("skills-preview");
  const notAvailableSkills = Object.values(skillsByCategories)
    .flat(1)
    .map((skill) => skill.name);
  const availableSkills = skills
    .filter((skill) => !notAvailableSkills.includes(skill.name))
    .map((skill) => ({ ...skill, categoryId: skill.category.id }));
  const availableSkillsByCategories = useGetSkillsByCategories(
    availableSkills,
    categories
  );

  const onDeleteSkills = (names: string[]) => {
    startTransition(() => {
      const promise = deleteSkill({ name: names });
      toast.promise(promise, {
        success: names.length > 1 ? t("skills-deleted") : t("skill-deleted"),
        error: t("error"),
        loading: t("loading"),
      });
      router.refresh();
    });
  };

  const onUpdateSkill =
    (oldSkill: SkillMastery) =>
    ({ name, mastery, categoryId }: Partial<SkillMastery>) => {
      startTransition(() => {
        let promise: Promise<unknown> = Promise.resolve();
        if (name) {
          promise = Promise.all([
            deleteSkill({
              name: [oldSkill.name],
            }),
            addSkill({
              name,
              categoryId,
              mastery: oldSkill.mastery,
            }),
          ]);
        } else if (mastery) {
          promise = updateSkill({
            name: oldSkill.name,
            categoryId: oldSkill.categoryId,
            mastery,
          });
        }
        toast.promise(promise, {
          success: t("skill-updated"),
          error: t("error"),
          loading: t("loading"),
        });
        router.refresh();
      });
    };

  const onAddSkill = () => {
    let oldMastery: Mastery = Mastery.Novice;

    return ({ name, mastery, categoryId }: Partial<SkillMastery>) => {
      if (name) {
        startTransition(async () => {
          const promise = addSkill({
            name,
            categoryId,
            mastery: oldMastery,
          });
          toast.promise(promise, {
            success: t("skill-added"),
            error: t("error"),
            loading: t("loading"),
          });
          router.refresh();
        });
      } else if (mastery) {
        oldMastery = mastery;
      }
    };
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="mb-6 uppercase font-black text-4xl tracking-widest">
        {t("skills")}
      </h2>
      <Deletable onDeleteItems={onDeleteSkills}>
        <DeletableContent className="space-y-4">
          {!!availableSkills.length && (
            <SkillItem
              skillsByCategories={availableSkillsByCategories}
              isEditable
              isDisabled={isPending}
              onChange={onAddSkill()}
              key={availableSkills.length}
            />
          )}
          {Object.entries(skillsByCategories).map(([catName, skills]) => (
            <div className="space-y-4" key={catName}>
              <Separator />
              <h3 className="font-black text-2xl text-muted-foreground">
                {catName}
              </h3>
              <div className="flex flex-wrap gap-4">
                {skills.map((skill) => (
                  <DeletableItem id={skill.name} key={skill.name}>
                    <SkillItem
                      name={skill.name}
                      mastery={skill.mastery}
                      skillsByCategories={availableSkillsByCategories}
                      isEditable
                      isDisabled={isPending}
                      onChange={onUpdateSkill(skill)}
                    />
                  </DeletableItem>
                ))}
              </div>
            </div>
          ))}
        </DeletableContent>

        <DeletableTrigger className="ml-auto">
          <Button disabled={isPending}>{t("delete")}</Button>
        </DeletableTrigger>
      </Deletable>
    </div>
  );
};
