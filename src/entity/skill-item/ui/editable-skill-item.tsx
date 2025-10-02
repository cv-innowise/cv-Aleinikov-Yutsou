"use client";

import { Slider } from "@/shared/components/ui/slider";
import { SkillItemProps } from "../types";
import { MASTERY_BG_COLOR, MasteryMappa } from "../consts";
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
import { Mastery } from "@/shared/types/cv-graphql";

export const EditableSkillItem = ({
  skillsByCategories,
  name,
  mastery,
  isDisabled,
  onChange,
}: SkillItemProps) => {
  const [selectedSkill, setSelectedSkill] = useState<string>(
    name || "Add new skill..."
  );
  const [selectedMastery, setSelectedMastery] = useState<Mastery>(
    mastery || Mastery.Novice
  );
  const [open, setOpen] = useState<boolean>(false);

  const onSkillChage = (categoryId: string) => (newSkill: string) => {
    if (newSkill !== selectedSkill) {
      setSelectedSkill(newSkill);
      onChange({ name: newSkill, categoryId });
    }
    setOpen(false);
  };

  const onMasteryChange = ([newMastery]: number[]) => {
    onChange({ mastery: MasteryMappa[newMastery] });
  };

  return (
    <div className="min-w-[200px] w-min px-4 py-2 flex justify-center items-center space-x-2 rounded-full transition-colors hover:bg-black/5">
      <Slider
        value={[Object.keys(Mastery).indexOf(selectedMastery) + 1]}
        onValueChange={([val]) => setSelectedMastery(MasteryMappa[val])}
        onValueCommit={onMasteryChange}
        max={Object.keys(Mastery).length}
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
            disabled={isDisabled}
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
              {Object.entries(skillsByCategories).map(([name, skills]) => (
                <CommandGroup key={name}>
                  <span className="text-sm mx-1 text-muted-foreground">
                    {name}
                  </span>
                  {skills.map(({ name: skillName, categoryId }) => (
                    <CommandItem
                      key={skillName}
                      value={skillName}
                      onSelect={onSkillChage(categoryId)}
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
