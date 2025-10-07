"use client";

import { ProjectSelect } from "@/entity/project";
import { DialogContent } from "@/shared/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shared/components/ui/form";
import { Project, ProjectItem } from "@/shared/graphql/projects/projects.types";
import { useForm } from "react-hook-form";

interface CvProjectFormProps {
  selectedProject?: Project;
  projects: ProjectItem[];
  cvId: string;
}

type FormTypes = {
  projectId: string;
};

export const CvProjectForm: React.FC<CvProjectFormProps> = ({ projects, selectedProject, cvId }) => {
  const form = useForm<FormTypes>({
    defaultValues: {
      projectId: selectedProject?.id || "",
    },
  });

  const onSubmit = (data: FormTypes) => {
    console.log("Submit:", { cvId, ...data });
  };
  const clearForm = () => {
    form.reset();
  };

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project</FormLabel>
                <FormControl>
                  <ProjectSelect projects={projects} value={field.value} onClear={clearForm} onChange={field.onChange} placeholder="Select project" />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </DialogContent>
  );
};
