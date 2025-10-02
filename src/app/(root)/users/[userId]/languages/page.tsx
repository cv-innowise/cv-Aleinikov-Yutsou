import { UserLanguages } from "@/widgets/user-languages";
import { Suspense } from "react";

interface UserLanguagePageProps {
  params: Promise<{ userId: string }>;
}

const UserLanguagesPage: React.FC<UserLanguagePageProps> = async ({
  params,
}) => {
  const { userId } = await params;

  return (
    <Suspense fallback={<UserLanguages.Skeleton />}>
      <UserLanguages userId={userId} />
    </Suspense>
  );
};

export default UserLanguagesPage;
