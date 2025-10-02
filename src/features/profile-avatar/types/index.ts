import { Profile } from "@/shared/graphql/profile/profile.types";
import { User } from "@/shared/graphql/users/users.types";

export interface ProfileAvatarProps{
  userId: User["id"],
  avatarUrl: Profile["avatar"];
  email: User["email"];
  isEditable: boolean;
}