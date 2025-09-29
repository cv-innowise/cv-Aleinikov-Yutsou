"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Input } from "@/shared/components/ui/input";
import { Calendar } from "@/shared/components/ui/calendar";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/lib/utils";
import { useGetProject } from "../queries/use-get-project";
import { createProject } from "../mutations/create-project";
import { updateProject } from "../mutations/update-project";
import { Project } from "@/shared/graphql/projects/projects.types";
import { projectSchema } from "../validation/project.schema";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProjectFormProps {
  projectId?: Project["id"];
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ projectId }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const project = useGetProject(projectId);
  const [environment, setEnvironment] = useState(project?.environment || []);
  const form = useForm<yup.InferType<typeof projectSchema>>({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      name: project?.name,
      domain: project?.domain,
      start_date: project?.start_date,
      end_date: project?.end_date,
      description: project?.description,
      environment: project?.environment ?? [],
    },
  });

  const onAddEnvironment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItem = e.currentTarget.value;

      if (newItem && !form.getValues("environment").includes(newItem)) {
        const newEnvironment = [...form.getValues("environment"), newItem];

        setEnvironment(newEnvironment);
        form.setValue("environment", newEnvironment);
        e.currentTarget.value = "";
      }
    }
  };

  const onDeleteEnvironment = (deletedEnv: string) => () => {
    const newEnvironment = form
      .getValues("environment")
      .filter((value: string) => value !== deletedEnv);

    setEnvironment(newEnvironment);
    form.setValue("environment", newEnvironment);
  };

  const onSubmit = (formData: yup.InferType<typeof projectSchema>) => {
    startTransition(async () => {
      let promise: Promise<unknown>;
      const start_date = formData.start_date.toDateString();
      const end_date = formData.end_date?.toDateString();
      if (project) {
        promise = updateProject({
          projectId: project.id,
          ...formData,
          start_date,
          end_date,
        });
      } else {
        promise = createProject({ ...formData, start_date, end_date });
      }

      toast.promise(promise, {
        success: project ? "Project was updated" : "Project was created",
        error: "Somethin went wrong",
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
            {project ? "Update Project" : "Create Project"}
          </DialogTitle>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Project name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain</FormLabel>
                <FormControl>
                  <Input placeholder="Project domain" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-x-2 justify-between">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            data-testid="start-date-button"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date (optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            data-testid="end-date-button"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write something about this project..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <FormLabel htmlFor="environment-input">Environment</FormLabel>
            <Input
              onKeyDown={onAddEnvironment}
              id="environment-input"
              className="max-w-200px"
              placeholder={"Press \"Enter\" to add environment"}
            />
            {form.getFieldState("environment").error && (
              <p className="text-destructive text-sm">
                {form.getFieldState("environment").error?.message}
              </p>
            )}
            <div className="flex gap-x-1 gap-y-2 flex-wrap">
              {environment.map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name={"environment"}
                  render={() => {
                    return (
                      <FormItem key={item}>
                        <FormControl>
                          <Checkbox
                            checked
                            onCheckedChange={onDeleteEnvironment(item)}
                            hidden
                          />
                        </FormControl>
                        <FormLabel className="p-1 text-sm rounded-lg border-primary shadow-sm transition hover:shadow-primary hover:-translate-y-1">
                          {item}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
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
