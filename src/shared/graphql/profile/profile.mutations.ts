import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`;

export const DELETE_AVATAR = gql`
  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`;

export const ADD_PROFILE_LANGUAGE = gql`
  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`;

export const UPDATE_PROFILE_LANGUAGE = gql`
  mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {
    updateProfileLanguage(language: $language) {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`;

export const DELETE_PROFILE_LANGUAGE = gql`
  mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {
    deleteProfileLanguage(language: $language) {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`;

export const ADD_PROFILE_SKILL = gql`
  mutation AddProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`;

export const UPDATE_PROFILE_SKILL = gql`
  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`;

export const DELETE_PROFILE_SKILL = gql`
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`;
