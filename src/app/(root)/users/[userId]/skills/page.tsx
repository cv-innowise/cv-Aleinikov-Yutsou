import { UserSkills } from "@/widgets/user-skills";
import { Suspense } from "react";

interface UserSkillsPageProps {
  params: Promise<{ userId: string }>;
}

const UserSkillsPage: React.FC<UserSkillsPageProps> = async ({ params }) => {
  const { userId } = await params;

  return (
    <Suspense fallback={<UserSkills.Skeleton />}>
      <UserSkills userId={userId} />
    </Suspense>
  );
};

export default UserSkillsPage;
