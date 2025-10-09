"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ProjectSelect } from "@/entity/project";
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Calendar } from "@/shared/components/ui/calendar";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import { useCvProjectForm } from "../lib/use-cv-project-form";
import { CvProject } from "@/shared/types/cv-graphql";

interface CvProjectFormProps {
  cvId: string;
  cvProject?: CvProject;
}

export const CvProjectForm: React.FC<CvProjectFormProps> = ({ cvId, cvProject }) => {
  const t = useTranslations("cv.projects.form");
  const { form, onSubmit, isPending, clearForm, handleProjectChange, projectLoading, projectError } = useCvProjectForm({ cvId, cvProject });
  const disabledSelect = !!cvProject || projectLoading;

  return (
    <DialogContent>
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <DialogTitle className="mb-4">{t(cvProject ? "title.update" : "title.create")}</DialogTitle>
          <div className="w-full flex gap-2.5">
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{t("project.label")}</FormLabel>
                  <FormControl>
                    <ProjectSelect disabled={disabledSelect} value={field.value} onClear={clearForm} onChange={handleProjectChange} label={t("project.label")} placeholder={t("project.placeholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{t("domain.label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("domain.placeholder")} {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex gap-2.5">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{t("startDate.label")}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")} disabled={!form.getValues("projectId") || projectLoading}>
                          {field.value ? format(field.value, "PPP") : <span>{t("startDate.placeholder")}</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value || undefined} onSelect={field.onChange} disabled={(date) => date > new Date("2100-01-01") || date < new Date("1900-01-01")} captionLayout="dropdown" />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{t("endDate.label")}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")} disabled={!form.getValues("projectId") || projectLoading}>
                          {field.value ? format(field.value, "PPP") : <span>{t("endDate.placeholder")}</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value || undefined} onSelect={field.onChange} disabled={(date) => date > new Date("2100-01-01") || date < new Date("1900-01-01")} captionLayout="dropdown" />
                    </PopoverContent>
                  </Popover>
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
                <FormLabel>{t("description.label")}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t("description.placeholder")} {...field} disabled className="resize-none" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="environment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("environment.label")}</FormLabel>
                <div className="flex flex-wrap gap-2 min-h-[2.25rem] items-start rounded-md border px-3 py-2 bg-muted/30">
                  {field.value.length === 0 && <span className="text-muted-foreground text-sm">{t("environment.noData")}</span>}
                  {field.value.map((env) => (
                    <span key={env} className="text-xs px-2 py-1 rounded bg-secondary border">
                      {env}
                    </span>
                  ))}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="responsibilities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("responsibilities.label")}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t("responsibilities.placeholder")} {...field} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("roles.label")}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t("roles.placeholder")} {...field} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {projectError && <p className="text-red-500 text-sm">{t("error.fetchProjects")}</p>}

          <div className="flex justify-end">
            <Button type="submit" disabled={!form.getValues("projectId") || isPending} loading={isPending}>
              {t(cvProject ? "submit.update" : "submit.create")}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
