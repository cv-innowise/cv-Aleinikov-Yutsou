import { EditableLanguageItem } from "./editable-language-item";
import { LanguageItemProps } from "../types";
import { cn } from "@/shared/lib/utils";
import { PROFICIENCY_TEXT_COLOR } from "../consts";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Button } from "@/shared/components/ui/button";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";

export const LanguageItem: FCWithSkeleton<LanguageItemProps> = (props) => {
  const { name, proficiency, isEditable } = props;

  if (isEditable || !name || !proficiency) {
    return <EditableLanguageItem {...props} />;
  }

  return (
    <div className="min-w-[200px] w-min px-4 py-2 flex justify-center items-center space-x-4 rounded-full transition-colors hover:bg-black/5">
      <Button
        variant="ghost"
        disabled
        size="sm"
        role="combobox"
        data-testid="proficiency-button"
        className={cn("uppercase text-sm", PROFICIENCY_TEXT_COLOR[proficiency])}
      >
        {proficiency}
      </Button>
      <Button
        variant="ghost"
        disabled
        size="sm"
        role="combobox"
        data-testid="language-button"
      >
        {name}
      </Button>
    </div>
  );
};

LanguageItem.Skeleton = () => {
  return <Skeleton className="w-[200px] h-[40px] rounded-full" />;
};

LanguageItem.Skeleton.displayName = "LanguageItem.Skeleton";