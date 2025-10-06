import { SkillsPreview } from "@/features/skills-preview";
import { getCv } from "@/shared/lib/queries/get-cv";
import { getSkillCategories } from "@/shared/lib/queries/get-skill-categories";
import { getSkills } from "@/shared/lib/queries/get-skills";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { SkillMastery, UserRole } from "@/shared/types/cv-graphql";
import { useGetSkillsByCategories } from "@/shared/lib/hooks/use-get-skills-by-categories";
import { getTranslations } from "next-intl/server";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { addCvSkill } from "../mutation/add-cv-skill";
import { updateCvSkill } from "../mutation/update-cv-skill";
import { deleteCvSkills } from "../mutation/delete-cv-skill";

interface CvSkillsProps {
  cvId: string;
}

export const CvSkills: FCWithSkeleton<CvSkillsProps> = async ({ cvId }) => {
  const [authUser, cv, skills, skillCategories, t] = await Promise.all([getAuthUser(), getCv(cvId), getSkills(), getSkillCategories(), getTranslations("cv.skills")]);

  if (!cv) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h2 className="text-4xl">{t("cvNotFound")}</h2>
        <Button variant="link" asChild>
          <Link className="underline" href={`/cvs`}>
            {t("yourCV")}
          </Link>
        </Button>
      </div>
    );
  }

  const cvSkills = cv?.skills ?? ([] as SkillMastery[]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const skillsByCategories = useGetSkillsByCategories(cvSkills, skillCategories);

  const isEditable = authUser.role === UserRole.Admin || authUser.id === cv.user?.id;

  const addSkill = (cvIdParam: string) => async (skill: SkillMastery) => {
    "use server";
    addCvSkill({
      cvId: cvIdParam,
      ...skill,
    });
  };

  const updateSkill = (cvIdParam: string) => async (skill: SkillMastery) => {
    "use server";
    updateCvSkill({ cvId: cvIdParam, ...skill });
  };

  const deleteSkills = (cvIdParam: string) => async (payload: { name: string[] }) => {
    "use server";
    deleteCvSkills({ cvId: cvIdParam, ...payload });
  };

  return <SkillsPreview skills={skills} skillsByCategories={skillsByCategories} categories={skillCategories} addSkill={addSkill(cvId)} updateSkill={updateSkill(cvId)} deleteSkill={deleteSkills(cvId)} isEditable={isEditable} />;
};

CvSkills.Skeleton = () => {
  return <SkillsPreview.Skeleton />;
};

CvSkills.Skeleton.displayName = "CvSkills.Skeleton";
