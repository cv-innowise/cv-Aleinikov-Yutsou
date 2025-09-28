import { SkillItem } from "@/entity/skill-item";
import { SkillsPreviewProps } from "../types";
import { EditableSkillsPreview } from "./editable-skills-preview";
import { Separator } from "@/shared/components/ui/separator";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const SkillsPreview: FCWithSkeleton<SkillsPreviewProps> = (props) => {
  const { skillsByCategories, isEditable } = props;

  if (isEditable) {
    return <EditableSkillsPreview {...props} />;
  }

  return (
    <div className="w-full space-y-4">
      <h2 className="mb-6 uppercase font-black text-4xl tracking-widest">
        Skills
      </h2>
      <div className="space-y-4">
        {Object.entries(skillsByCategories).map(([catName, skills]) => (
          <div className="space-y-4" key={catName}>
            <Separator />
            <h3 className="font-black text-2xl text-muted-foreground">
              {catName}
            </h3>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill) => (
                <SkillItem
                  key={skill.name}
                  name={skill.name}
                  mastery={skill.mastery}
                  skillsByCategories={{}}
                  isEditable={false}
                  isDisabled={false}
                  onChange={() => {}}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SkillsPreview.Skeleton = () => {
  return (
    <div className="w-full space-y-4">
      <h2 className="mb-6 uppercase font-black text-4xl tracking-widest">
        Skills
      </h2>
      <div className="space-y-4">
        <div className="space-y-4">
          <Separator />
          <Skeleton className="w-[340px] h-[32px]" />

          <div className="flex flex-wrap gap-4">
            <SkillItem.Skeleton />
            <SkillItem.Skeleton />
            <SkillItem.Skeleton />
          </div>
        </div>
        <div className="space-y-4">
          <Separator />
          <Skeleton className="w-[200px] h-[32px]" />

          <div className="flex flex-wrap gap-4">
            <SkillItem.Skeleton />
            <SkillItem.Skeleton />
          </div>
        </div>
        <div className="space-y-4">
          <Separator />
          <Skeleton className="w-[500px] h-[32px]" />

          <div className="flex flex-wrap gap-4">
            <SkillItem.Skeleton />
            <SkillItem.Skeleton />
            <SkillItem.Skeleton />
            <SkillItem.Skeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

SkillsPreview.Skeleton.displayName = "SkillsPreview.Skeleton";