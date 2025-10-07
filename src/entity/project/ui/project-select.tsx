import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { GET_PROJECTS } from "@/shared/graphql/projects/projects.queries";
import { ProjectsResponse } from "@/shared/graphql/projects/projects.types";
import { cn } from "@/shared/lib/utils";
import { useQuery } from "@apollo/client/react";
import { AlertCircle, X } from "lucide-react";

interface ProjectSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  onClear?: () => void;
}

export const ProjectSelect: React.FC<ProjectSelectProps> = ({ value, onChange, placeholder = "Select project", label = "Projects", disabled = false, onClear }) => {
  const { data, error } = useQuery<ProjectsResponse>(GET_PROJECTS);
  const projects = data?.projects || [];

  const showClear = !!value && !disabled && onClear;

  if (error) {
    return (
      <div className="flex items-center gap-2 text-destructive text-sm">
        <AlertCircle size={16} />
        <span>Failed to load projects</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={!disabled ? onChange : undefined}>
        <SelectTrigger disabled={disabled} className="w-full">
          <SelectValue className="capitalize" placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {projects.map((project) => (
              <SelectItem className="capitalize" key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {showClear && (
        <Button type="button" variant="ghost" size="icon" className="rounded hover:bg-muted text-muted-foreground hover:text-foreground transition" onClick={onClear}>
          <X size={14} />
        </Button>
      )}
    </div>
  );
};
