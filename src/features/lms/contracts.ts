import type { Course, Enrollment, LmsCapability, Membership, OrgRole, User, WorkspaceAccess, WorkspaceMode } from "./types";

export interface ApiErrorBody {
  error: "BAD_REQUEST" | "UNAUTHENTICATED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "INTERNAL_ERROR";
  message: string;
  details?: unknown;
}

export interface SessionResponse {
  user: User;
  workspaces: WorkspaceAccess[];
}

export interface CreateWorkspaceInput {
  name: string;
  mode: WorkspaceMode;
}

export interface CreateCourseInput {
  workspaceId: string;
  title: string;
  code: string;
  description: string;
}

export interface AddMemberInput {
  userId: string;
  role: OrgRole;
}

export interface EnrollStudentInput {
  workspaceId: string;
  courseId: string;
  studentId: string;
}

export type { Course, Enrollment, LmsCapability, Membership, OrgRole, User, WorkspaceAccess, WorkspaceMode };
