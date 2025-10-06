import { ProjectItem } from "@/shared/graphql/projects/projects.types";
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { Form, FormField } from "@/shared/components/ui/form";

interface CvProjectFormProps {
  project?: ProjectItem;
}

export const CvProjectForm: React.FC<CvProjectFormProps> = ({ project }) => {
  const form = useForm<>({
    defaultValues: {},
  });
  return (
    <DialogContent>
      <Form>
        <form>
          <DialogTitle> {project ? "Update Project" : "Create Project"}</DialogTitle>
          <FormField />
        </form>
      </Form>
    </DialogContent>
  );
};
