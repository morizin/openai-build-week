# ProofPath LMS implementation map

This map records the current boundary between the application UI and LMS API.
Client components import only `@/features/lms/client` and contract types; API route handlers are the only callers of the server service.

| UI route | Read source | Write source | Capability-gated controls | Current state |
| --- | --- | --- | --- | --- |
| `/dashboard` | `session`, `listCourses(workspaceId)` | — | — | Live course summary; assignment/deadline cards are fixtures |
| `/courses` | `listCourses(workspaceId)` | `createCourse` | `course:create` | Live |
| `/courses/[courseId]` | `listCourses`, `listEnrollments`, `listMembers` | `publishCourse`, `enrollStudent` | `course:publish`, `enrollment:manage`, `enrollment:self` | Live |
| `/people` | `listMembers(workspaceId)` | `addMember` | `workspace:manage-members` | Live, organization teachers only |
| `/assignments` | Typed local fixture | — | — | Planned API; visibly marked preview data |
| `/calendar` | Typed local fixture | — | Add-event affordance is `course:publish`-gated | Planned API; visibly marked preview data |
| `/grades` | Typed local fixture | — | — | Planned API; visibly marked preview data |
| `/inbox` | Typed local fixture | — | — | Planned API; visibly marked preview data |

## API map

| Endpoint | Method | Contract / validation | Authorization | UI client method |
| --- | --- | --- | --- | --- |
| `/api/session` | GET | `SessionResponse` | Valid authenticated actor | `session()` |
| `/api/workspaces` | GET | `WorkspaceAccess[]` | Valid authenticated actor | `listWorkspaces()` |
| `/api/workspaces` | POST | `CreateWorkspaceInput` | Valid authenticated actor | `createWorkspace()` |
| `/api/workspaces/:workspaceId/members` | GET | `Membership[]` | Organization teacher; self-serve owner | `listMembers()` |
| `/api/workspaces/:workspaceId/members` | POST | `AddMemberInput` | Organization teacher | `addMember()` |
| `/api/courses?workspaceId=…` | GET | `Course[]` | Workspace member; students receive assigned, published courses only | `listCourses()` |
| `/api/courses` | POST | `CreateCourseInput` | Organization teacher or self-serve owner | `createCourse()` |
| `/api/courses/:courseId/publish` | POST | `{ workspaceId }` | Organization teacher or self-serve owner | `publishCourse()` |
| `/api/enrollments?workspaceId=…&courseId=…` | GET | `Enrollment[]` | Workspace member; students receive only their own records | `listEnrollments()` |
| `/api/enrollments` | POST | `EnrollStudentInput` | Organization teacher, or self-serve owner enrolling only themselves | `enrollStudent()` |

## Error and state mapping

| API result | UI response |
| --- | --- |
| Initial request | Stable page, card, row, or roster skeleton; no premature zero totals |
| Empty success | Scoped empty state with the available next action |
| `400 BAD_REQUEST` | Preserve form input and show validation recovery copy |
| `401 UNAUTHENTICATED` | Session shell displays the sign-in-boundary message |
| `403 FORBIDDEN` | Controls are capability-gated; server remains authoritative |
| `404 NOT_FOUND` | Course route shows a scoped not-found state and link back to courses |
| `409 CONFLICT` | Form remains in context and returns the duplicate/state-collision message |
| `500 INTERNAL_ERROR` | Page-level retry is available for session loading |

Malformed JSON is normalized to `400 BAD_REQUEST` at the API boundary. The current actor header is intentionally isolated in `createLmsApiClient`; UI components never construct it.
