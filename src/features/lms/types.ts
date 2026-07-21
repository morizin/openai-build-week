export type WorkspaceMode = "self-serve" | "organization";
export type OrgRole = "teacher" | "student";
export type MembershipRole = "owner" | OrgRole;
export type CourseStatus = "draft" | "published" | "archived";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  mode: WorkspaceMode;
  createdBy: string;
  createdAt: string;
}

export interface Membership {
  id: string;
  workspaceId: string;
  userId: string;
  role: MembershipRole;
  createdAt: string;
}

export interface Course {
  id: string;
  workspaceId: string;
  title: string;
  code: string;
  description: string;
  status: CourseStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  id: string;
  workspaceId: string;
  courseId: string;
  studentId: string;
  enrolledBy: string;
  createdAt: string;
}

export interface LmsState {
  users: User[];
  workspaces: Workspace[];
  memberships: Membership[];
  courses: Course[];
  enrollments: Enrollment[];
}
