"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { ProjectSelect } from "@/entity/project";
import { DialogContent } from "@/shared/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Calendar } from "@/shared/components/ui/calendar";
import { cn } from "@/shared/lib/utils";

import { GET_PROJECT } from "@/shared/graphql/projects/projects.queries";
import { Project, ProjectItem, ProjectResponse } from "@/shared/graphql/projects/projects.types";
import { useLazyQuery } from "@apollo/client/react";

interface CvProjectFormProps {
  selectedProject?: Project;
  projects: ProjectItem[];
  cvId: string;
}

type FormTypes = {
  projectId: string;
  description: string;
  domain: string;
  responsibilities?: string;
  roles?: string;
  start_date: Date | null;
  end_date: Date | null;
  environment: string[];
};

export const CvProjectForm: React.FC<CvProjectFormProps> = ({ projects, selectedProject, cvId }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormTypes>({
    defaultValues: {
      projectId: selectedProject?.id || "",
      description: "",
      domain: "",
      responsibilities: "",
      roles: "",
      start_date: null,
      end_date: null,
      environment: [],
    },
  });

  const [loadProject, { data: projectData, loading: projectLoading, error: projectError }] = useLazyQuery<ProjectResponse>(GET_PROJECT, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const project = projectData?.project;
    if (project) {
      form.setValue("description", project.description || "");
      form.setValue("domain", project.domain || "");
      form.setValue("start_date", project.start_date ? new Date(project.start_date) : null);
      form.setValue("end_date", project.end_date ? new Date(project.end_date) : null);
      form.setValue("environment", project.environment || []);
    }
  }, [projectData, form]);

  const onSubmit = (data: FormTypes) => {
    startTransition(() => {});
  };

  const clearForm = () => {
    form.reset();
  };

  const handleProjectChange = (value: string) => {
    form.reset({
      projectId: value,
      description: "",
      domain: "",
      start_date: null,
      end_date: null,
      environment: [],
    });
    loadProject({ variables: { projectId: value } });
  };

  return (
    <DialogContent>
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full flex gap-2.5">
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Project</FormLabel>
                  <FormControl>
                    <ProjectSelect projects={projects} value={field.value} onClear={clearForm} onChange={handleProjectChange} placeholder="Select project" />
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
                  <FormLabel>Domain</FormLabel>
                  <FormControl>
                    <Input placeholder="Domain" {...field} disabled />
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
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")} disabled={!form.getValues("projectId") || projectLoading}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")} disabled={!form.getValues("projectId") || projectLoading}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Project description" {...field} disabled className="resize-none" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="environment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Environment</FormLabel>
                <div className="flex flex-wrap gap-2 min-h-[2.25rem] items-start rounded-md border px-3 py-2 bg-muted/30">
                  {field.value.length === 0 && <span className="text-muted-foreground text-sm">No environment</span>}
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
                <FormLabel>Responsibilities</FormLabel>
                <FormControl>
                  <Textarea placeholder="List responsibilities" {...field} className="resize-none" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roles</FormLabel>
                <FormControl>
                  <Input placeholder="Roles in project" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {projectError && <p className="text-red-500 text-sm">Failed to load project data.</p>}

          <div className="flex justify-end">
            <Button type="submit" disabled={!form.getValues("projectId") || isPending} loading={isPending}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
