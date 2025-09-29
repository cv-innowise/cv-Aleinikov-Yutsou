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
import { Language } from "@/shared/graphql/languages/languages.types";
import { useGetLanguage } from "../queries/use-get-language";
import { languageSchema } from "../validation/language.schema";
import { createLanguage } from "../mutations/create-language";
import { updateLanguage } from "../mutations/update-language";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LanguageFormProps {
  languageId?: Language["id"];
}

export const LanguageForm: React.FC<LanguageFormProps> = ({ languageId }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const language = useGetLanguage(languageId);
  const form = useForm<yup.InferType<typeof languageSchema>>({
    resolver: yupResolver(languageSchema),
    defaultValues: {
      name: language?.name,
      native_name: language?.native_name || "",
      iso2: language?.iso2,
    },
  });

  const onSubmit = (formData: yup.InferType<typeof languageSchema>) => {
    startTransition(async () => {
      let promise: Promise<unknown>;
      if (language) {
        promise = updateLanguage({ languageId: language.id, ...formData });
      } else {
        promise = createLanguage(formData);
      }

      toast.promise(promise, {
        success: language ? "Language was updated" : "Language was created",
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
            {language ? "Update Language" : "Create Language"}
          </DialogTitle>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Language name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="native_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Native Name (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Language native name"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="iso2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISO2</FormLabel>
                <FormControl>
                  <Input placeholder="Language iso2 format" {...field} />
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
