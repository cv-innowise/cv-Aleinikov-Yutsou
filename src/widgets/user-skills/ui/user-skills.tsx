import { getProfile } from "@/shared/lib/queries/get-profile";
import { User } from "@/shared/graphql/users/users.types";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { SkillMastery, UserRole } from "@/shared/types/cv-graphql";
import { useGetSkillsByCategories } from "@/shared/lib/hooks/use-get-skills-by-categories";
import { SkillsPreview } from "@/features/skills-preview";
import { getSkills } from "@/shared/lib/queries/get-skills";
import { addProfileSkill } from "../mutations/add-profile-skill";
import { updateProfileSkill } from "../mutations/update-profile-skill";
import { deleteProfileSkills } from "../mutations/delete-profile-skill";
import { getSkillCategories } from "@/shared/lib/queries/get-skill-categories";

interface UserSkillsProps {
  userId: User["id"];
}

export const UserSkills: FCWithSkeleton<UserSkillsProps> = async ({
  userId,
}) => {
  const authUser = await getAuthUser();
  const profile = await getProfile(userId);
  const skills = await getSkills();
  const skillCategories = await getSkillCategories();

  if (!profile) {
    return <h2 className="text-4xl">Sorry, user not found.</h2>;
  }
  const { skills: userSkills } = profile;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const skillsByCategories = useGetSkillsByCategories(
    userSkills,
    skillCategories
  );

  const isEditable = authUser.role === UserRole.Admin || userId === authUser.id;

  const addSkill = (userId: User["id"]) => async (skill: SkillMastery) => {
    "use server";
    addProfileSkill({ userId, ...skill });
  };

  const updateSkill = (userId: User["id"]) => async (skill: SkillMastery) => {
    "use server";
    updateProfileSkill({ userId, ...skill });
  };

  const deleteSkills =
    (userId: User["id"]) => async (skills: { name: string[] }) => {
      "use server";
      deleteProfileSkills({ userId, ...skills });
    };

  return (
    <SkillsPreview
      skills={skills}
      skillsByCategories={skillsByCategories}
      categories={skillCategories}
      addSkill={addSkill(authUser.id)}
      updateSkill={updateSkill(authUser.id)}
      deleteSkill={deleteSkills(authUser.id)}
      isEditable={isEditable}
    />
  );
};

UserSkills.Skeleton = () => {
  return <SkillsPreview.Skeleton />;
};

UserSkills.Skeleton.displayName = "UserSkills.Skeleton";
