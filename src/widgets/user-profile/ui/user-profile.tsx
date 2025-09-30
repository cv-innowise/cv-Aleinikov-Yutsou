import { ProfileAvatar } from "@/features/profile-avatar";
import { User } from "@/shared/graphql/users/users.types";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { getProfile } from "@/shared/lib/queries/get-profile";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";
import { UserRole } from "@/shared/types/cv-graphql";
import { getUser } from "../queries/get-user";
import { format } from "date-fns";
import { ProfileForm, ProfileFormSkeleton } from "@/features/profile-form";
import { getPositions } from "@/shared/lib/queries/get-positions";
import { getDepartments } from "@/shared/lib/queries/get-departments";
import { Skeleton } from "@/shared/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { getTranslations } from 'next-intl/server';

interface UserProfileProps {
  userId: User["id"];
}

export const UserProfile: FCWithSkeleton<UserProfileProps> = async ({
  userId,
}) => {
  const authUser = await getAuthUser();
  const user = await getUser(userId);
  const profile = await getProfile(userId);
  const departments = await getDepartments();
  const positions = await getPositions();
  const tNotFound = await getTranslations("not-found");
  const tProfile = await getTranslations("user-profile");

  if (!user || !profile) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h2 className="text-4xl">{tNotFound("user-not-found")}</h2>
        <Button variant="link" asChild>
          <Link className="underline" href={`/users/${authUser.id}/profile`}>
            {tNotFound("your-profile")}
          </Link>
        </Button>
      </div>
    );
  }

  const isEditable = authUser.role === UserRole.Admin || userId === authUser.id;
  const formatedDate = format(
    new Date(parseInt(profile.created_at)),
    "EEE LLL d yyyy"
  );

  return (
    <div className="flex flex-col items-center space-y-2">
      <ProfileAvatar
        userId={userId}
        avatarUrl={profile.avatar}
        email={user.email}
        isEditable={isEditable}
      />
      {profile.full_name && (
        <h4 className="text-4xl text-bold">{profile.full_name}</h4>
      )}
      <Link
        href={`mailto:${user.email}`}
        className="underline text-muted-foreground"
      >
        {user.email}
      </Link>
      <span>{tProfile("member-since")} {formatedDate}</span>
      <ProfileForm
        user={user}
        profile={profile}
        departments={departments}
        positions={positions}
        isEditable={isEditable}
      />
    </div>
  );
};

UserProfile.Skeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <ProfileAvatar.Skeleton />
      <Skeleton className="w-[250px] h-[40px]" />
      <Skeleton className="w-[200px] h-[14px]" />
      <Skeleton className="w-[230px] h-[24px]" />
      <ProfileFormSkeleton />
    </div>
  );
};

UserProfile.Skeleton.displayName = "UserProfile.Skeleton";
