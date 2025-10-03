import {
  Project as FullProject,
  CreateProjectInput,
  UpdateProjectInput,
  DeleteProjectInput,
  DeleteResult,
} from "@/shared/types/cv-graphql";

type ProjectItem = Omit<
  FullProject,
  "created_at" | "description" | "environment"
>;

type Project = Omit<FullProject, "created_at">;

type ProjectRequest = { projectId: Project["id"] };
type CreateProjectRequest = { project: CreateProjectInput };
type UpdateProjectRequest = { project: UpdateProjectInput };
type DeleteProjectRequest = { project: DeleteProjectInput };

type ProjectsResponse = { projects: ProjectItem[] };
type ProjectResponse = { project: Project };
type CreateProjectResponse = { createProject: Project };
type UpdateProjectResponse = { updateProject: Project };
type DeleteProjectResponse = { deleteProject: DeleteResult };

export type {
  ProjectItem,
  Project,
  ProjectRequest,
  CreateProjectRequest,
  UpdateProjectRequest,
  DeleteProjectRequest,
  ProjectsResponse,
  ProjectResponse,
  CreateProjectResponse,
  UpdateProjectResponse,
  DeleteProjectResponse,
};
