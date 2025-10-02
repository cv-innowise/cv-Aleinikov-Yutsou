import { getProfile } from "@/shared/lib/queries/get-profile";
import { User } from "@/shared/graphql/users/users.types";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { LanguageProficiency, UserRole } from "@/shared/types/cv-graphql";
import { addProfileLanguage } from "../mutations/add-profile-language";
import { updateProfileLanguage } from "../mutations/update-profile-language";
import { deleteProfileLanguages } from "../mutations/delete-profile-languages";
import { LanguagesPreview } from "@/features/languages-preview";
import { getLanguages } from "@/shared/lib/queries/get-languages";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { getTranslations } from "next-intl/server";

interface UserLanguagesProps {
  userId: User["id"];
}

export const UserLanguages: FCWithSkeleton<UserLanguagesProps> = async ({
  userId,
}) => {
  const authUser = await getAuthUser();
  const profile = await getProfile(userId);
  const languages = await getLanguages();
  const tNotFound = await getTranslations("not-found");

  if (!profile) {
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

  const { languages: userLanguages } = profile;
  const isEditable = authUser.role === UserRole.Admin || userId === authUser.id;

  const addLanguage =
    (userId: User["id"]) => async (language: LanguageProficiency) => {
      "use server";
      addProfileLanguage({ userId, ...language });
    };

  const updateLanguage =
    (userId: User["id"]) => async (language: LanguageProficiency) => {
      "use server";
      updateProfileLanguage({ userId, ...language });
    };

  const deleteLanguages =
    (userId: User["id"]) => async (language: { name: string[] }) => {
      "use server";
      deleteProfileLanguages({ userId, ...language });
    };

  return (
    <LanguagesPreview
      languages={languages}
      languagesWithProficiency={userLanguages}
      addLanguage={addLanguage(authUser.id)}
      updateLanguage={updateLanguage(authUser.id)}
      deleteLanguages={deleteLanguages(authUser.id)}
      isEditable={isEditable}
    />
  );
};

UserLanguages.Skeleton = () => {
  return <LanguagesPreview.Skeleton />;
};

UserLanguages.Skeleton.displayName = "UserLanguages.Skeleton";
