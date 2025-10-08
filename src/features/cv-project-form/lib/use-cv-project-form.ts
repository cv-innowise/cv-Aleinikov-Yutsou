import { ProjectResponse } from "@/shared/graphql/projects/projects.types";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { addCvProject } from "../mutation/add-cv-project";
import { toast } from "sonner";
import { useLazyQuery } from "@apollo/client/react";
import { GET_PROJECT } from "@/shared/graphql/projects/projects.queries";
import { useRouter } from "next/navigation";
import { CvProject } from "@/shared/types/cv-graphql";
import { updateCvProject } from "../mutation/update-cv-project";
import { useTranslations } from "next-intl";

interface AddCvProjectInput {
  cvId: string;
  cvProject?: CvProject;
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

export const useCvProjectForm = ({ cvId, cvProject }: AddCvProjectInput) => {
  const t = useTranslations("cv.projects.form");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [loadProject, { data: projectData, loading: projectLoading, error: projectError }] = useLazyQuery<ProjectResponse>(GET_PROJECT);

  const form = useForm<FormTypes>({
    defaultValues: {
      projectId: cvProject?.project.id || "",
      description: cvProject?.description || "",
      domain: cvProject?.domain || "",
      responsibilities: cvProject?.responsibilities?.join("\n") || "",
      roles: cvProject?.roles?.join("\n") || "",
      start_date: cvProject?.start_date ? new Date(cvProject.start_date) : null,
      end_date: cvProject?.end_date ? new Date(cvProject.end_date) : null,
      environment: cvProject?.environment || [],
    },
  });

  useEffect(() => {
    if (cvProject) return;

    const project = projectData?.project;
    if (project) {
      form.setValue("description", project.description || "");
      form.setValue("domain", project.domain || "");
      form.setValue("start_date", project.start_date ? new Date(project.start_date) : null);
      form.setValue("end_date", project.end_date ? new Date(project.end_date) : null);
      form.setValue("environment", project.environment || []);
    }
  }, [projectData, form, cvProject]);

  const onSubmit = (formData: FormTypes) => {
    const roles =
      formData.roles
        ?.split("\n")
        .map((r) => r.trim())
        .filter(Boolean) ?? [];

    const responsibilities =
      formData.responsibilities
        ?.split("\n")
        .map((r) => r.trim())
        .filter(Boolean) ?? [];

    const start_date = formData.start_date ? formData.start_date.toISOString() : "";
    const end_date = formData.end_date ? formData.end_date.toISOString() : "";

    startTransition(async () => {
      try {
        if (cvProject) {
          console.log("cvId", cvId);
          console.log("projectId", cvProject.id);
          console.log("start_date", start_date);
          console.log("end_date", end_date);
          console.log("roles", roles);
          console.log("responsibilities", responsibilities);
          await updateCvProject({
            cvId,
            projectId: formData.projectId,
            start_date,
            end_date,
            roles,
            responsibilities,
          });
          toast.success(t("success.update"));
        } else {
          await addCvProject({
            cvId,
            projectId: formData.projectId,
            roles,
            responsibilities,
            start_date,
            end_date,
          });

          toast.success(t("success.add"));
          form.reset();
        }
      } catch (error) {
        const errorMessage = t(cvProject ? "error.update" : "error.add");
        toast.error(errorMessage);
        console.error("Error adding project:", error);
      } finally {
        router.refresh();
      }
    });
  };

  const clearForm = () => {
    form.reset();
  };

  const handleProjectChange = (value: string) => {
    form.reset({
      projectId: value,
      description: "",
      domain: "",
      responsibilities: "",
      roles: "",
      start_date: null,
      end_date: null,
      environment: [],
    });

    if (value) {
      loadProject({ variables: { projectId: value } });
    }
  };

  return {
    form,
    onSubmit,
    isPending,
    clearForm,
    handleProjectChange,
    projectLoading,
    projectError,
  };
};
