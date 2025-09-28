import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";
import { LanguagesPreviewProps } from "../types";
import { LanguageItem } from "@/entity/language-item";
import { EditableLanguagesPreview } from "./editable-languages-preview";

export const LanguagesPreview: FCWithSkeleton<LanguagesPreviewProps> = (
  props
) => {
  const { languagesWithProficiency, isEditable } = props;

  if (isEditable) {
    return <EditableLanguagesPreview {...props} />;
  }

  return (
    <div className="w-full space-y-4">
      <h2 className="mb-6 uppercase font-black text-4xl tracking-widest">
        Languages
      </h2>
      <div className="flex flex-wrap gap-4">
        {languagesWithProficiency.map((lang) => (
          <LanguageItem
            key={lang.name}
            name={lang.name}
            proficiency={lang.proficiency}
            languages={[]}
            isEditable={false}
            isDisabled={false}
            onChange={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

LanguagesPreview.Skeleton = () => {
  return (
    <div className="w-full space-y-4">
      <h2 className="mb-6 uppercase font-black text-4xl tracking-widest">
        Languages
      </h2>
      <div className="flex flex-wrap gap-4">
        <LanguageItem.Skeleton />
        <LanguageItem.Skeleton />
        <LanguageItem.Skeleton />
        <LanguageItem.Skeleton />
      </div>
    </div>
  );
};

LanguagesPreview.Skeleton.displayName = "LanguagesPreview.Skeleton";
