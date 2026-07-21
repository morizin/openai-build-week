import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(2).max(80),
  mode: z.enum(["self-serve", "organization"]),
});

export const addMemberSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(["teacher", "student"]),
});

export const createCourseSchema = z.object({
  workspaceId: z.string().min(1),
  title: z.string().trim().min(3).max(120),
  code: z.string().trim().min(2).max(20).transform((value) => value.toUpperCase()),
  description: z.string().trim().max(1000).default(""),
});

export const enrollStudentSchema = z.object({
  workspaceId: z.string().min(1),
  courseId: z.string().min(1),
  studentId: z.string().min(1),
});
