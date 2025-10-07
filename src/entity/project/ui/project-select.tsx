import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { ProjectItem } from "@/shared/graphql/projects/projects.types";
import { X } from "lucide-react";

interface ProjectSelectProps {
  projects: ProjectItem[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  onClear?: () => void;
}

export const ProjectSelect: React.FC<ProjectSelectProps> = ({ projects, value, onChange, placeholder = "Select project", label = "Projects", disabled = false, onClear }) => {
  const showClear = !!value && !disabled && onClear;

  return (
    <div className="relative">
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
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
        <Button variant="ghost" size="icon" className="absolute inset-y-0 right-1 flex items-center p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition" onClick={onClear}>
          <X size={14} />
        </Button>
      )}
    </div>
  );
};
