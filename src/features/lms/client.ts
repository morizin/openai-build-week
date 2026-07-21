import type {
  AddMemberInput,
  ApiErrorBody,
  Course,
  CreateCourseInput,
  CreateWorkspaceInput,
  Enrollment,
  EnrollStudentInput,
  Membership,
  SessionResponse,
  WorkspaceAccess,
} from "./contracts";

type Fetcher = typeof fetch;

export class LmsApiError extends Error {
  constructor(public readonly status: number, public readonly body: ApiErrorBody) {
    super(body.message);
  }
}

export interface LmsApiClient {
  session(): Promise<SessionResponse>;
  listWorkspaces(): Promise<WorkspaceAccess[]>;
  createWorkspace(input: CreateWorkspaceInput): Promise<WorkspaceAccess>;
  listMembers(workspaceId: string): Promise<Membership[]>;
  addMember(workspaceId: string, input: AddMemberInput): Promise<Membership>;
  listCourses(workspaceId: string): Promise<Course[]>;
  createCourse(input: CreateCourseInput): Promise<Course>;
  publishCourse(workspaceId: string, courseId: string): Promise<Course>;
  listEnrollments(workspaceId: string, courseId?: string): Promise<Enrollment[]>;
  enrollStudent(input: EnrollStudentInput): Promise<Enrollment>;
}

export function createLmsApiClient(options: { actorId: string; baseUrl?: string; fetcher?: Fetcher }): LmsApiClient {
  const baseUrl = options.baseUrl ?? "";
  const fetcher = options.fetcher ?? fetch;

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetcher(`${baseUrl}${path}`, {
      ...init,
      headers: { "content-type": "application/json", "x-user-id": options.actorId, ...init?.headers },
    });
    const body = (await response.json()) as T | ApiErrorBody;
    if (!response.ok) throw new LmsApiError(response.status, body as ApiErrorBody);
    return body as T;
  }

  return {
    session: () => request("/api/session"),
    listWorkspaces: () => request("/api/workspaces"),
    createWorkspace: (input) => request("/api/workspaces", { method: "POST", body: JSON.stringify(input) }),
    listMembers: (workspaceId) => request(`/api/workspaces/${encodeURIComponent(workspaceId)}/members`),
    addMember: (workspaceId, input) => request(`/api/workspaces/${encodeURIComponent(workspaceId)}/members`, { method: "POST", body: JSON.stringify(input) }),
    listCourses: (workspaceId) => request(`/api/courses?workspaceId=${encodeURIComponent(workspaceId)}`),
    createCourse: (input) => request("/api/courses", { method: "POST", body: JSON.stringify(input) }),
    publishCourse: (workspaceId, courseId) => request(`/api/courses/${encodeURIComponent(courseId)}/publish`, { method: "POST", body: JSON.stringify({ workspaceId }) }),
    listEnrollments: (workspaceId, courseId) => request(`/api/enrollments?workspaceId=${encodeURIComponent(workspaceId)}${courseId ? `&courseId=${encodeURIComponent(courseId)}` : ""}`),
    enrollStudent: (input) => request("/api/enrollments", { method: "POST", body: JSON.stringify(input) }),
  };
}

export function can(capabilities: readonly string[], capability: string): boolean {
  return capabilities.includes(capability);
}
