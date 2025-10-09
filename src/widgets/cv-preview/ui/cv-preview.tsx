import { getCv } from "@/shared/lib/queries/get-cv";
import { getSkillCategories } from "@/shared/lib/queries/get-skill-categories";
import { getTranslations } from "next-intl/server";
import { CvPreviewClient } from "./cv-preview-client";
import { groupSkillsByCategory } from "@/shared/lib/group-skills-by-category";

interface CvPreviewProps {
  cvId: string;
}

export const CvPreview = async ({ cvId }: CvPreviewProps) => {
  const cv = await getCv(cvId);
  const categories = await getSkillCategories();
  const t = await getTranslations("cv.preview");

  if (!cv) {
    return <div className="rounded-lg border border-border p-6 text-sm text-muted-foreground">{t("cvNotFound")}</div>;
  }

  const groupedSkills = groupSkillsByCategory(cv.skills, categories);

  return <CvPreviewClient skills={groupedSkills} cv={cv} />;
};
