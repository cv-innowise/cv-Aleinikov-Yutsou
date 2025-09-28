import { UserProfile } from "@/widgets/user-profile";
import { Suspense } from "react";

interface UserProfilePageProps {
  params: Promise<{ userId: string }>;
}

const UserProfilePage: React.FC<UserProfilePageProps> = async ({ params }) => {
  const { userId } = await params;

  return (
    <Suspense fallback={<UserProfile.Skeleton />}>
      <UserProfile userId={userId} />
    </Suspense>
  );
};

export default UserProfilePage;
