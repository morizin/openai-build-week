# ProofPath LMS

ProofPath is an LMS foundation with two operating modes:

- **Self-serve:** one individual owns a personal workspace, creates or follows a private course plan, and may enroll only themselves.
- **Organization-serve:** an organization owns the workspace. Membership is explicitly either `teacher` or `student`; teachers manage courses, publishing, membership, and enrollment, while students consume assigned learning.

The initial product includes the conventional LMS surface: courses, assignments, calendar, grades, inbox, roles, workspaces, enrollment, and course lifecycle. The research-backed mastery/evidence engine is isolated for later integration.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run test:backend
npm run typecheck
npm run lint
npm run build
```

## Backend model

The backend lives in `src/features/lms` and is split into typed contracts, Zod request validation, an authorization-aware service, and a replaceable repository. The current repository is deterministic in-memory storage for Build Week; it can be replaced with a transactional database adapter without changing API or authorization rules.

Seed users for local API calls:

| User ID | Mode / role |
| --- | --- |
| `user-elena` | Northstar organization teacher |
| `user-maya` | Northstar organization student |
| `user-jordan` | Northstar organization student |
| `user-sam` | Self-serve workspace owner |

API requests identify the demo actor with the `x-user-id` header.

## API routes

- `GET /api/session`
- `GET|POST /api/workspaces`
- `POST /api/workspaces/:workspaceId/members`
- `GET|POST /api/courses`
- `POST /api/courses/:courseId/publish`
- `POST /api/enrollments`

All write routes validate input and enforce workspace mode and server-side role permissions.
