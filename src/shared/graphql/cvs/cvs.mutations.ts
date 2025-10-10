import { gql } from "@apollo/client";

const CREATE_CV = gql`
  mutation CreateCv($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      id
    }
  }
`;

const UPDATE_CV = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
    }
  }
`;

const DELETE_CV = gql`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`;

const ADD_CV_SKILL = gql`
  mutation AddCvSkill($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
      id
    }
  }
`;

const UPDATE_CV_SKILL = gql`
  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {
    updateCvSkill(skill: $skill) {
      id
    }
  }
`;

const DELETE_CV_SKILL = gql`
  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
      id
    }
  }
`;

const ADD_CV_PROJECT = gql`
  mutation AddCvProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      id
    }
  }
`;

const UPDATE_CV_PROJECT = gql`
  mutation UpdateCvProject($project: UpdateCvProjectInput!) {
    updateCvProject(project: $project) {
      id
    }
  }
`;

const REMOVE_CV_PROJECT = gql`
  mutation DeleteCvProject($project: RemoveCvProjectInput!) {
    removeCvProject(project: $project) {
      id
    }
  }
`;

const EXPORT_PDF = gql`
  mutation ExportCvToPdf($pdf: ExportPdfInput!) {
    exportPdf(pdf: $pdf)
  }
`;

export { EXPORT_PDF, CREATE_CV, UPDATE_CV, DELETE_CV, ADD_CV_SKILL, UPDATE_CV_SKILL, DELETE_CV_SKILL, ADD_CV_PROJECT, UPDATE_CV_PROJECT, REMOVE_CV_PROJECT };
