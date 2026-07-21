import { randomUUID } from "node:crypto";
import { LmsError } from "./errors";
import { MemoryLmsRepository } from "./repository";
import type { Course, MembershipRole, OrgRole, WorkspaceMode } from "./types";

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export class LmsService {
  constructor(private readonly repository: MemoryLmsRepository) {}

  getSession(userId: string) {
    const state = this.repository.read();
    const user = state.users.find((candidate) => candidate.id === userId);
    if (!user) throw new LmsError("UNAUTHENTICATED", "A valid user is required.");
    return {
      user,
      workspaces: state.memberships.filter((membership) => membership.userId === userId).map((membership) => ({
        ...state.workspaces.find((workspace) => workspace.id === membership.workspaceId)!,
        role: membership.role,
      })),
    };
  }

  createWorkspace(actorId: string, input: { name: string; mode: WorkspaceMode }) {
    this.requireUser(actorId);
    const state = this.repository.read();
    const slugBase = slugify(input.name) || "workspace";
    const slug = state.workspaces.some((workspace) => workspace.slug === slugBase) ? `${slugBase}-${randomUUID().slice(0, 6)}` : slugBase;
    const workspace = { id: `ws-${randomUUID()}`, name: input.name, slug, mode: input.mode, createdBy: actorId, createdAt: new Date().toISOString() };
    const role: MembershipRole = input.mode === "organization" ? "teacher" : "owner";
    this.repository.update((draft) => {
      draft.workspaces.push(workspace);
      draft.memberships.push({ id: `mem-${randomUUID()}`, workspaceId: workspace.id, userId: actorId, role, createdAt: workspace.createdAt });
    });
    return { ...workspace, role };
  }

  addOrganizationMember(actorId: string, workspaceId: string, userId: string, role: OrgRole) {
    const workspace = this.requireWorkspace(workspaceId);
    if (workspace.mode !== "organization") throw new LmsError("BAD_REQUEST", "Personal workspaces do not support organization memberships.");
    this.requireRole(actorId, workspaceId, ["teacher"]);
    this.requireUser(userId);
    const state = this.repository.read();
    if (state.memberships.some((membership) => membership.workspaceId === workspaceId && membership.userId === userId)) {
      throw new LmsError("CONFLICT", "This user is already a workspace member.");
    }
    const membership = { id: `mem-${randomUUID()}`, workspaceId, userId, role, createdAt: new Date().toISOString() };
    this.repository.update((draft) => draft.memberships.push(membership));
    return membership;
  }

  listCourses(actorId: string, workspaceId: string): Course[] {
    this.requireMembership(actorId, workspaceId);
    return this.repository.read().courses.filter((course) => course.workspaceId === workspaceId);
  }

  createCourse(actorId: string, input: { workspaceId: string; title: string; code: string; description: string }) {
    const workspace = this.requireWorkspace(input.workspaceId);
    this.requireRole(actorId, input.workspaceId, workspace.mode === "organization" ? ["teacher"] : ["owner"]);
    const state = this.repository.read();
    if (state.courses.some((course) => course.workspaceId === input.workspaceId && course.code === input.code)) {
      throw new LmsError("CONFLICT", "Course codes must be unique within a workspace.");
    }
    const now = new Date().toISOString();
    const course: Course = { id: `course-${randomUUID()}`, ...input, status: "draft", createdBy: actorId, createdAt: now, updatedAt: now };
    this.repository.update((draft) => draft.courses.push(course));
    return course;
  }

  publishCourse(actorId: string, workspaceId: string, courseId: string) {
    const workspace = this.requireWorkspace(workspaceId);
    this.requireRole(actorId, workspaceId, workspace.mode === "organization" ? ["teacher"] : ["owner"]);
    let result: Course | undefined;
    this.repository.update((draft) => {
      const course = draft.courses.find((candidate) => candidate.id === courseId && candidate.workspaceId === workspaceId);
      if (!course) throw new LmsError("NOT_FOUND", "Course not found.");
      course.status = "published";
      course.updatedAt = new Date().toISOString();
      result = structuredClone(course);
    });
    return result!;
  }

  enrollStudent(actorId: string, input: { workspaceId: string; courseId: string; studentId: string }) {
    const workspace = this.requireWorkspace(input.workspaceId);
    const state = this.repository.read();
    const course = state.courses.find((candidate) => candidate.id === input.courseId && candidate.workspaceId === input.workspaceId);
    if (!course) throw new LmsError("NOT_FOUND", "Course not found.");
    if (course.status !== "published") throw new LmsError("BAD_REQUEST", "Only published courses accept enrollment.");

    if (workspace.mode === "organization") {
      this.requireRole(actorId, input.workspaceId, ["teacher"]);
      this.requireRole(input.studentId, input.workspaceId, ["student"]);
    } else {
      this.requireRole(actorId, input.workspaceId, ["owner"]);
      if (actorId !== input.studentId) throw new LmsError("FORBIDDEN", "A self-serve owner can enroll only themselves.");
    }
    if (state.enrollments.some((enrollment) => enrollment.courseId === input.courseId && enrollment.studentId === input.studentId)) {
      throw new LmsError("CONFLICT", "The learner is already enrolled.");
    }
    const enrollment = { id: `enroll-${randomUUID()}`, ...input, enrolledBy: actorId, createdAt: new Date().toISOString() };
    this.repository.update((draft) => draft.enrollments.push(enrollment));
    return enrollment;
  }

  private requireUser(userId: string) {
    const user = this.repository.read().users.find((candidate) => candidate.id === userId);
    if (!user) throw new LmsError("UNAUTHENTICATED", "A valid user is required.");
    return user;
  }

  private requireWorkspace(workspaceId: string) {
    const workspace = this.repository.read().workspaces.find((candidate) => candidate.id === workspaceId);
    if (!workspace) throw new LmsError("NOT_FOUND", "Workspace not found.");
    return workspace;
  }

  private requireMembership(userId: string, workspaceId: string) {
    const membership = this.repository.read().memberships.find((candidate) => candidate.userId === userId && candidate.workspaceId === workspaceId);
    if (!membership) throw new LmsError("FORBIDDEN", "Workspace membership is required.");
    return membership;
  }

  private requireRole(userId: string, workspaceId: string, roles: MembershipRole[]) {
    const membership = this.requireMembership(userId, workspaceId);
    if (!roles.includes(membership.role)) throw new LmsError("FORBIDDEN", `This action requires one of these roles: ${roles.join(", ")}.`);
    return membership;
  }
}
