import { gql } from "@apollo/client"

export const GET_SKILLS = gql`
  query GetSkills {
    skills {
      id
      name
      category{
        id
      }
      category_name
    }
  }
`;

export const GET_SKILL_CATEGORIES = gql`
  query GetSkillCategories {
    skillCategories {
      id
      name
    }
  }
`;