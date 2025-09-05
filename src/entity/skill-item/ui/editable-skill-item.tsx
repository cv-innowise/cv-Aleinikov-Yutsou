import { Slider } from "@/shared/components/ui/slider";
import { Mastery, MASTERY_LENGTH } from "@/shared/lib/types/skill";
import { SkillItemProps } from "../types";
import { MASTERY_BG_COLOR } from "../consts";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { cn } from "@/shared/lib/utils";

export const EditableSkillItem = ({
  categories,
  skill,
  mastery,
  isDisabled,
  onChange,
}: SkillItemProps) => {
  const [selectedSkill, setSelectedSkill] = useState<string>(
    skill || "Add new skill..."
  );
  const [selectedMastery, setSelectedMastery] = useState<Mastery>(
    mastery || Mastery.NOVICE
  );
  const [open, setOpen] = useState<boolean>(false);

  const onSkillChage = (newSkill: string) => {
    if (newSkill !== selectedSkill) {
      setSelectedSkill(newSkill);
      onChange({ name: newSkill });
    }
    setOpen(false);
  };

  const onMasteryChange = ([newMastery]: number[]) => {
    onChange({ mastery: newMastery-1 });
  };

  return (
    <div className="relative flex space-x-2">
      <Slider
        value={[selectedMastery + 1]}
        onValueChange={([val]) => setSelectedMastery(val ? val - 1 : 0)}
        onValueCommit={onMasteryChange}
        max={MASTERY_LENGTH + 1}
        disabled={isDisabled}
        color={
          isDisabled ? "bg-muted-foreground" : MASTERY_BG_COLOR[selectedMastery]
        }
        className="w-[100px] mb-1"
        content={Mastery[selectedMastery]}
        data-testid="slider"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={isDisabled}>
          <Button
            variant="ghost"
            size="sm"
            role="combobox"
            aria-expanded={open}
            className="w-min min-w-[50px] justify-between"
            data-testid="skill-button"
          >
            {selectedSkill || "Select skill..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search skills..." className="h-9" />
            <CommandList>
              <CommandEmpty>No skills found.</CommandEmpty>
              {categories.map(({ name, skills }) => (
                <CommandGroup key={name}>
                  <span className="text-sm mx-1 text-muted-foreground">
                    {name}
                  </span>
                  {skills.map((skillName) => (
                    <CommandItem
                      key={skillName}
                      value={skillName}
                      onSelect={onSkillChage}
                    >
                      {skillName}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedSkill === skillName
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
