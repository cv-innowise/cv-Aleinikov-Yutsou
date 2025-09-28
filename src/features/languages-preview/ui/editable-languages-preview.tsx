"use client";

import { LanguageProficiency, Proficiency } from "@/shared/types/cv-graphql";
import {
  Deletable,
  DeletableContent,
  DeletableItem,
  DeletableTrigger,
} from "@/features/deletable";
import { LanguageItem } from "@/entity/language-item";
import { Button } from "@/shared/components/ui/button";
import { LanguagesPreviewProps } from "../types";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export const EditableLanguagesPreview: React.FC<LanguagesPreviewProps> = ({
  languages,
  languagesWithProficiency,
  addLanguage,
  updateLanguage,
  deleteLanguages,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const availableLanguages = languages
    .map((lang) =>
      languagesWithProficiency.find((langItem) => langItem.name === lang.name)
        ? ""
        : lang.name
    )
    .filter(Boolean);

  const onDeleteLanguages = (names: string[]) => {
    startTransition(async () => {
      const promise = deleteLanguages({ name: names });

      toast.promise(promise, {
        success:
          names.length > 1 ? "Languages were deleted" : "Language was deleted",
        error: "Something went wrong",
        loading: "Loading...",
      });
      router.refresh();
    });
  };

  const onUpdateLanguage = (oldLang: LanguageProficiency) => {
    return ({ name, proficiency }: Partial<LanguageProficiency>) => {
      startTransition(async () => {
        let promise: Promise<unknown> = Promise.resolve();

        if (name) {
          promise = Promise.all([
            deleteLanguages({
              name: [oldLang.name],
            }),
            addLanguage({
              name,
              proficiency: oldLang.proficiency,
            }),
          ]);
        } else if (proficiency) {
          promise = updateLanguage({ name: oldLang.name, proficiency });
        }

        toast.promise(promise, {
          success: "Language was updated",
          error: "Something went wrong",
          loading: "Loading...",
        });
        router.refresh();
      });
    };
  };

  const onAddLanguage = () => {
    let prof: Proficiency = Proficiency.A1;

    return ({ name, proficiency }: Partial<LanguageProficiency>) => {
      if (name) {
        startTransition(async () => {
          const promise = addLanguage({
            name,
            proficiency: prof,
          });

          toast.promise(promise, {
            success: "Language was added",
            error: "Something went wrong",
            loading: "Loading...",
          });
          router.refresh();
        });
      } else if (proficiency) {
        prof = proficiency;
      }
    };
  };
  return (
    <div className="w-full space-y-4">
      <h2 className="mb-6 uppercase font-black text-4xl tracking-widest">
        Languages
      </h2>
      <Deletable onDeleteItems={onDeleteLanguages}>
        {!!availableLanguages.length && (
          <LanguageItem
            languages={availableLanguages}
            isEditable
            isDisabled={isPending}
            onChange={onAddLanguage()}
            key={availableLanguages.length}
          />
        )}
        <DeletableContent className="flex flex-wrap gap-4">
          {languagesWithProficiency.map((lang) => (
            <DeletableItem id={lang.name} key={lang.name}>
              <LanguageItem
                name={lang.name}
                proficiency={lang.proficiency}
                isEditable
                languages={availableLanguages}
                isDisabled={isPending}
                onChange={onUpdateLanguage(lang)}
              />
            </DeletableItem>
          ))}
        </DeletableContent>

        <DeletableTrigger className="ml-auto">
          <Button disabled={isPending}>Delete languages</Button>
        </DeletableTrigger>
      </Deletable>
    </div>
  );
};
