import { Slider } from "@/shared/components/ui/slider";
import { SkillItemProps } from "../types";
import { MASTERY_BG_COLOR } from "../consts";
import { Button } from "@/shared/components/ui/button";
import { EditableSkillItem } from "./editable-skill-item";
import { Mastery } from "@/shared/types/cv-graphql";
import { Skeleton } from '@/shared/components/ui/skeleton';
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";

export const SkillItem: FCWithSkeleton<SkillItemProps> = (props) => {
  const { mastery, name, isEditable } = props;

  if (isEditable || !name || !mastery) {
    return <EditableSkillItem {...props} />;
  }

  return (
    <div className="relative flex space-x-2">
      <Slider
        value={[Object.keys(Mastery).indexOf(mastery) + 1]}
        max={Object.keys(Mastery).length}
        disabled
        color={MASTERY_BG_COLOR[mastery]}
        className="w-[100px] mb-1"
        data-testid="slider"
      />
      <Button
        variant="ghost"
        disabled
        size="sm"
        role="combobox"
        className="w-[150px] justify-between"
        data-testid="skill-button"
      >
        {name}
      </Button>
    </div>
  );
};

SkillItem.Skeleton = () => {
  return <Skeleton className="w-[200px] h-[40px] rounded-full" />;
}

SkillItem.Skeleton.displayName = "SkillItem.Skeleton";