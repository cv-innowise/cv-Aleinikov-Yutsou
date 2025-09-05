import { Slider } from "@/shared/components/ui/slider";
import { MASTERY_LENGTH } from "@/shared/lib/types/skill";
import { SkillItemProps } from "../types";
import { MASTERY_BG_COLOR } from "../consts";
import { Button } from "@/shared/components/ui/button";
import { EditableSkillItem } from "./editable-skill-item";



export const SkillItem = (props: SkillItemProps) => {
  const { mastery, skill, isEditable } = props;

  if (isEditable || !skill || !mastery) {
    return <EditableSkillItem {...props} />;
  }

  return (
    <div className="relative flex space-x-2">
      <Slider
        value={[mastery + 1]}
        max={MASTERY_LENGTH + 1}
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
        {skill}
      </Button>
    </div>
  );
};
