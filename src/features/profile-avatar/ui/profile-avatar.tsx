import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { ProfileAvatarProps } from "../types";
import { EditableProfileAvatar } from "./editable-profile-avatar";
import { FCWithSkeleton } from "@/shared/types/fc-with-skeleton";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const ProfileAvatar: FCWithSkeleton<ProfileAvatarProps> = (props) => {
  const { avatarUrl, email, isEditable } = props;

  if (isEditable) {
    return <EditableProfileAvatar {...props} />;
  }

  return (
    <Avatar className="w-20 h-20">
      <AvatarImage src={avatarUrl ?? undefined} />
      <AvatarFallback>{email[0]}</AvatarFallback>
    </Avatar>
  );
};

ProfileAvatar.Skeleton = () => {
  return <Skeleton className="w-20 h-20 rounded-full" />;
};

ProfileAvatar.Skeleton.displayName = "ProfileAvatar.Skeleton";
