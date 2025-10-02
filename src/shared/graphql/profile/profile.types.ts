import {
  Profile,
  UpdateProfileInput,
  UploadAvatarInput,
  DeleteAvatarInput,
  AddProfileLanguageInput,
  DeleteProfileLanguageInput,
  UpdateProfileLanguageInput,
  AddProfileSkillInput,
  UpdateProfileSkillInput,
  DeleteProfileSkillInput,
} from "@/shared/types/cv-graphql";
import { User } from "../users/users.types";

type ProfileResponse = { profile: Profile };
type UpdateProfileResponse = { updateProfile: Profile };
type UploadAvatarResponse = { uploadAvatar: string };
type DeleteAvatarResponse = { deleteAvatar: void };
type AddProfileLanguageResponse = { addProfileLanguage: Profile };
type UpdateProfileLanguageResponse = { updateProfileLanguage: Profile };
type DeleteProfileLanguageResponse = { deleteProfileLanguage: Profile };
type AddProfileSkillResponse = { addProfileSkill: Profile };
type UpdateProfileSkillResponse = { updateProfileSkill: Profile };
type DeleteProfileSkillResponse = { deleteProfileSkill: Profile };

type ProfileRequest = { userId: User["id"] };
type UpdateProfileRequest = { profile: UpdateProfileInput };
type UploadAvatarRequest = { avatar: UploadAvatarInput };
type DeleteAvatarRequest = { avatar: DeleteAvatarInput };
type AddProfileLanguageRequest = { language: AddProfileLanguageInput };
type UpdateProfileLanguageRequest = { language: UpdateProfileLanguageInput };
type DeleteProfileLanguageRequest = { language: DeleteProfileLanguageInput };
type AddProfileSkillRequest = { skill: AddProfileSkillInput };
type UpdateProfileSkillRequest = { skill: UpdateProfileSkillInput };
type DeleteProfileSkillRequest = { skill: DeleteProfileSkillInput };

export type {
  Profile,
  ProfileResponse,
  UpdateProfileResponse,
  UploadAvatarResponse,
  DeleteAvatarResponse,
  AddProfileLanguageResponse,
  UpdateProfileLanguageResponse,
  DeleteProfileLanguageResponse,
  AddProfileSkillResponse,
  UpdateProfileSkillResponse,
  DeleteProfileSkillResponse,
  ProfileRequest,
  UpdateProfileRequest,
  UploadAvatarRequest,
  DeleteAvatarRequest,
  AddProfileLanguageRequest,
  UpdateProfileLanguageRequest,
  DeleteProfileLanguageRequest,
  AddProfileSkillRequest,
  UpdateProfileSkillRequest,
  DeleteProfileSkillRequest,
};
