import { Cv as FullCv, User, Project, SkillMastery, CreateCvInput, UpdateCvInput, DeleteCvInput, AddCvSkillInput, UpdateCvSkillInput, DeleteCvSkillInput, AddCvProjectInput, UpdateCvProjectInput, RemoveCvProjectInput, DeleteResult } from "@/shared/types/cv-graphql";

type CvItem = Pick<FullCv, "id" | "name" | "description"> & {
  user?: {
    id: User["id"];
    email: User["email"];
  } | null;
};

type Cv = Omit<FullCv, "created_at" | "user" | "projects" | "skills"> & {
  user?: {
    id: User["id"];
    email: User["email"];
  } | null;
  projects?: Omit<Project, "project">[] | null;
  skills: SkillMastery[];
};

type CvRequest = { cvId: Cv["id"] };
type CreateCvRequest = { cv: CreateCvInput };
type UpdateCvRequest = { cv: UpdateCvInput };
type DeleteCvRequest = { skill: DeleteCvInput };
type AddCvSkillRequest = { skill: AddCvSkillInput };
type UpdateCvSkillRequest = { skill: UpdateCvSkillInput };
type DeleteCvSkillRequest = { cv: DeleteCvSkillInput };
type AddCvProjectRequest = { project: AddCvProjectInput };
type UpdateCvProjectRequest = { cv: UpdateCvProjectInput };
type RemoveCvProjectRequest = { cv: RemoveCvProjectInput };

type CvsResponse = { cvs: CvItem[] };
type CvResponse = { cv: Cv };
type CreateCvResponse = { createCv: Cv };
type UpdateCvResponse = { updateCv: Cv };
type DeleteCvResponse = { deleteCv: DeleteResult };
type AddCvSkillResponse = { addCvSkill: Cv["id"] };
type UpdateCvSkillResponse = { updateCvSkill: Cv["id"] };
type DeleteCvSkillResponse = { deleteCvSkill: Cv["id"] };
type AddCvProjectResponse = { addCvProject: Cv["id"] };
type UpdateCvProjectResponse = { updateCvProject: Cv["id"] };
type RemoveCvProjectResponse = { removeCvProject: Cv["id"] };

export type { CvItem, Cv, CvRequest, CreateCvRequest, UpdateCvRequest, DeleteCvRequest, AddCvSkillRequest, UpdateCvSkillRequest, DeleteCvSkillRequest, AddCvProjectRequest, UpdateCvProjectRequest, RemoveCvProjectRequest, CvsResponse, CvResponse, CreateCvResponse, UpdateCvResponse, DeleteCvResponse, AddCvSkillResponse, UpdateCvSkillResponse, DeleteCvSkillResponse, AddCvProjectResponse, UpdateCvProjectResponse, RemoveCvProjectResponse };
