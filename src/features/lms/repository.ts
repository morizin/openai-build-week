import type { LmsState } from "./types";

const seedState = (): LmsState => ({
  users: [
    { id: "user-maya", name: "Maya Chen", email: "maya@northstar.edu" },
    { id: "user-elena", name: "Dr. Elena Ruiz", email: "elena@northstar.edu" },
    { id: "user-jordan", name: "Jordan Lee", email: "jordan@northstar.edu" },
    { id: "user-sam", name: "Sam Rivera", email: "sam@example.com" },
  ],
  workspaces: [
    { id: "ws-northstar", name: "Northstar Academy", slug: "northstar-academy", mode: "organization", createdBy: "user-elena", createdAt: "2026-07-01T09:00:00.000Z" },
    { id: "ws-sam", name: "Sam's learning space", slug: "sam-learning-space", mode: "self-serve", createdBy: "user-sam", createdAt: "2026-07-03T09:00:00.000Z" },
  ],
  memberships: [
    { id: "mem-elena", workspaceId: "ws-northstar", userId: "user-elena", role: "teacher", createdAt: "2026-07-01T09:00:00.000Z" },
    { id: "mem-maya", workspaceId: "ws-northstar", userId: "user-maya", role: "student", createdAt: "2026-07-01T09:05:00.000Z" },
    { id: "mem-jordan", workspaceId: "ws-northstar", userId: "user-jordan", role: "student", createdAt: "2026-07-01T09:06:00.000Z" },
    { id: "mem-sam", workspaceId: "ws-sam", userId: "user-sam", role: "owner", createdAt: "2026-07-03T09:00:00.000Z" },
  ],
  courses: [
    { id: "course-data-101", workspaceId: "ws-northstar", title: "Data Literacy Foundations", code: "DATA-101", description: "Read, question, and communicate with data.", status: "published", createdBy: "user-elena", createdAt: "2026-07-02T09:00:00.000Z", updatedAt: "2026-07-15T09:00:00.000Z" },
  ],
  enrollments: [
    { id: "enroll-maya-data", workspaceId: "ws-northstar", courseId: "course-data-101", studentId: "user-maya", enrolledBy: "user-elena", createdAt: "2026-07-02T10:00:00.000Z" },
  ],
});

export class MemoryLmsRepository {
  private state: LmsState;

  constructor(initialState: LmsState = seedState()) {
    this.state = structuredClone(initialState);
  }

  read(): LmsState {
    return structuredClone(this.state);
  }

  update(mutator: (draft: LmsState) => void): LmsState {
    const draft = structuredClone(this.state);
    mutator(draft);
    this.state = draft;
    return this.read();
  }

  reset(): void {
    this.state = seedState();
  }
}

export function createSeededRepository(): MemoryLmsRepository {
  return new MemoryLmsRepository();
}
