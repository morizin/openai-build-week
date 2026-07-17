# LMS feature plan and competitive differentiation

**Scope:** This is a product decision document for ProofPath, not a claim that it will replace every institution’s LMS on day one. “LMS” is used consistently below; it covers academic and enterprise learning platforms where the capabilities overlap.

**Market note (July 17, 2026):** There is no honest, universal “#1 LMS.” Higher education, K–12, and enterprise learning have different leaders, buyers, standards, and required integrations. Canvas is the clearest North American higher-ed leader, while Moodle remains the major open-source/global option; D2L Brightspace and Blackboard remain major institutional platforms. In the enterprise segment, Absorb and Docebo are prominent AI/skills-focused platforms. [Canvas market position](https://www.instructure.com/resources/blog/canvas-lms-v-competition-why-higher-ed-chooses-canvas) · [D2L investor market snapshot](https://s29.q4cdn.com/190964490/files/doc_presentations/2026/04/D2L-Investor-Presentation-Q4-26-FINAL.pdf) · [G2 LMS category](https://www.g2.com/categories/learning-management-system-lms) · [Capterra 2026 shortlist methodology](https://www.capterra.com/learning-management-system-software/)

## The platforms we must understand

| Platform | Primary strength | Current capabilities we must assume exist | What that means for ProofPath |
| --- | --- | --- | --- |
| **Canvas by Instructure** | North American higher education; mature integration ecosystem | Course delivery, assignments, quizzes, rubrics, outcomes, Mastery Paths, SpeedGrader, gradebook, analytics, mobile apps, LTI/SIS integrations, and AI-supported teaching/feedback workflows. [Canvas overview](https://community.instructure.com/en/kb/articles/662716-what-is-canvas) · [2026 feature comparison](https://community.instructure.com/en/kb/articles/664412) | “We have courses, rubrics, analytics, AI grading, and mastery” is **not** differentiation. Make ProofPath interoperable with Canvas rather than trying to replace it in the first sale. |
| **Moodle LMS** | Open source, global flexibility, deep customisation | Course activities, competency frameworks, learner plans, competency evidence, dashboards, plugins, and configurable analytics models. [Moodle features](https://docs.moodle.org/500/en/Features) · [Competency learning plans](https://docs.moodle.org/en/Learning_plans) · [Analytics](https://docs.moodle.org/34/en/Learning_analytics) | Compete on a polished, opinionated evidence loop and fast instructor workflow—not on general configurability. Offer LTI/API compatibility later. |
| **D2L Brightspace** | Institutional learning, outcomes/mastery, analytics | Learning materials, mastery views, analytics, accessibility, and broad higher-ed/K–12 workflows. [Brightspace capability map](https://www.d2l.com/wp-content/uploads/2022/04/Asia-Mapping-Brightspace-Functionality-Infographic-HE-Digital-Version-2022.pdf) | A mastery dashboard is table stakes. ProofPath must show the *reasoning and transfer evidence* behind a mastery decision. |
| **Blackboard Learn Ultra** | Legacy institutional footprint and course administration | Standard course, assessment, gradebook, and content workflows plus AI Design Assistant generation tools. [Anthology AI Design Assistant overview](https://www.anthology.com/sites/default/files/2023-10/Anthology-AI%20Design%20Assistant-Overview_10-23.pdf) | Course-generation features are already commoditized; our AI needs to be visibly pedagogical and evidence-grounded. |
| **Google Classroom** | Lightweight, Google-native K–12 workflow | Assignment status, feedback, grades, practice sets, originality reports, and course/learner analytics. [Assessment and feedback](https://support.google.com/edu/classroom/answer/16643267?hl=en) · [Classroom analytics](https://support.google.com/edu/classroom/answer/14221372?hl=en) | Be richer than task management but simpler than institutional administration. Do not make an activity dashboard the core value proposition. |
| **Absorb LMS** | Enterprise learning, skills intelligence, agentic workflows | AI course/quiz creation, recommendations, skills paths, skill-gap tools, reporting, admin assistance, and workplace agents. [Absorb AI](https://www.absorblms.com/features/lms-ai) · [Absorb Skills](https://www.absorblms.com/products/absorb-skills) · [Aura announcement](https://www.absorblms.com/company/newsroom/absorb-software-launches-absorb-aura) | “AI agents,” “skill gaps,” and “personalized paths” are **not** unique in enterprise. ProofPath’s defensible edge is verified conceptual understanding and explainable, instructor-approved remediation. |
| **Docebo** | Enterprise/extended-enterprise learning and skills-based development | AI-tailored learning tied to skills, adjacent capabilities, job context, and fragmented enterprise data. [2026 skills-and-learning playbook](https://assets.docebo.com/pdf/2026/skills-learning-playbook.pdf) | Enterprise buyers will expect roles, skills frameworks, content catalogs, reporting, and integrations. Treat these as later platform requirements, not MVP differentiation. |

## The full LMS capability map

### 1. Table-stakes platform foundation

These are necessary for a serious LMS, but they do not create a unique product.

- Roles and permissions: learner, instructor, reviewer, administrator, guardian/manager where applicable.
- Identity: email sign-in, SSO/SAML/OIDC, SCIM provisioning, MFA policy, account recovery.
- Organisations and tenancy: schools/departments/cohorts, branding, terms, regional settings, retention controls.
- Course lifecycle: templates, authoring, publishing, enrolment, prerequisites, copy/version/archive, content library.
- Content delivery: rich text, files, video, audio, embeds, interactive content, mobile/responsive delivery, offline where relevant.
- Learning activity: assignments, quizzes, question banks, discussions, projects, peer review, live sessions, calendar, notifications.
- Grading: rubrics, moderation, gradebook, reattempts, accommodations, feedback, exports, completion rules.
- Credentials: outcomes, competencies, learning plans, certificates/badges, transcripts, evidence portfolios.
- Communication: announcements, inbox, discussion spaces, office hours, reminders, learner-support escalation.
- Accessibility and localisation: keyboard support, semantic markup, captions/transcripts, contrast, screen-reader testing, multilingual UI/content, time and format accommodations.
- Integrations: LTI 1.3/Advantage, SCORM, xAPI/cmi5 where relevant, SIS/HRIS/CRM, calendaring, video, storage, webhooks/API.
- Operations: audit logs, backups, incident response, usage/availability monitoring, data export, support tooling.

### 2. Learning-quality capabilities

These turn an LMS into a system that supports learning rather than merely distributing content.

- Outcomes and rubrics mapped to activities—not only modules and completion checkboxes.
- Diagnostic pre-checks that capture an answer, explanation, and confidence.
- Formative feedback that names the gap, links to the target, and gives one actionable next step.
- Adaptive sequencing based on demonstrated prerequisite gaps.
- Retrieval-practice items and spaced review scheduling.
- Worked examples for novices, then faded scaffolds and authentic application.
- New-context transfer checks before mastery is marked “verified.”
- A personal evidence portfolio: attempts, feedback, revisions, transfer checks, and instructor review.
- Instructor view of misconception patterns across a cohort.
- Early-support workflow that connects an observed issue to a recommended intervention—not merely a risk score.

### 3. AI-native capabilities

AI should support the learning loop, not be a generic chat window bolted to a course.

- **Approved-source retrieval:** tutor uses course/rubric material first and cites it in each substantive response.
- **Structured diagnosis:** extract the learner’s claim, reasoning evidence, likely misconception, confidence, and uncertainty separately.
- **Socratic coaching policy:** default to a hint, question, partial worked example, or counterexample; require an attempt before revealing a full solution.
- **Adaptive practice generator:** create a short, rubric-aligned retrieval item with controlled difficulty and source grounding.
- **Transfer verifier:** create a distinct assessment scenario and evaluate the new evidence against explicit criteria.
- **Instructor copilot:** summarize a learner’s evidence, draft an intervention message, and suggest a small-group re-teach plan; instructor approves all consequential actions.
- **Course studio:** transform approved outcomes and source materials into a draft scope, rubric, diagnostics, practice bank, and review schedule—always editable by the instructor.
- **Multimodal evidence:** accept text, code, voice transcript, image, or document work when a rubric can support evaluation; clearly disclose limitations.
- **Safety and governance:** source display, uncertainty, response reporting, teacher override, AI activity log, prompt/response retention controls, red-team/evaluation suite.
- **Cost and latency controls:** route tasks by complexity, cache approved content retrieval, queue long-running generation, expose graceful fallbacks.

## What ProofPath must differentiate on

The following five claims only work together. No one feature is enough.

### 1. Evidence over completion

**Category default:** completion, activity, grade, and sometimes declared skills.

**ProofPath:** every mastery state points to a learner attempt, the rubric criterion it supports, feedback received, and a later transfer check. “Verified” means evidence from a new task—not a watched video or a repeated correct answer.

### 2. Reasoning-level diagnosis, not score-level personalization

**Category default:** recommend the next course, flag low activity, or display outcome scores.

**ProofPath:** inspect the learner’s explanation and surface a *proposed misconception* with exact supporting evidence, confidence, and an instructor correction control. The model distinguishes “observed answer” from “interpretation.”

### 3. A teacher action system, not an analytics dashboard

Learning analytics dashboards alone have limited evidence of improving achievement. [Kaliisa et al., 2024](https://saqr.me/publication/2024-kaliisa-learning-analytics-lived-hype/)

**ProofPath:** show a short intervention queue: learner/cohort, missed concept, evidence snippet, suggested question or mini-lesson, expected time, approval state, and outcome after action. This keeps the instructor in control and makes analytics operational.

### 4. Pedagogically constrained AI

**Category default:** generate content, quizzes, summaries, and answers faster.

**ProofPath:** use AI under a learning contract: ground to approved material; elicit an attempt; preserve productive struggle; give a small scaffold; test transfer; disclose uncertainty; never silently make high-stakes decisions. This is supported by retrieval-practice, formative-assessment, feedback, tutoring, privacy, and human-oversight research in the project’s [learning-science library](LEARNING_SCIENCE_RESEARCH.md).

### 5. Teacher-calibrated learning model

**Category default:** opaque recommendation or generic skill label.

**ProofPath:** instructors can review, correct, merge, or reject misconception tags and rubric mappings. Those corrections improve future course-specific feedback while preserving an audit trail. This is the defensible human-in-the-loop layer missing from a generic chatbot experience.

## Feature priority: what we build first

| Priority | Build now | Why |
| --- | --- | --- |
| **P0: competition demo** | Instructor outcome + rubric; learner attempt/explanation/confidence; evidence-grounded proposed misconception; Socratic feedback; generated targeted practice; new transfer check; verified-mastery update; intervention queue; source/uncertainty/override UI | Demonstrates the complete differentiating loop in under three minutes. |
| **P1: usable pilot** | Auth/roles; multiple learners and courses; file/source ingestion with approval; course studio; question bank; spaced review; portfolio; instructor correction workflow; accessibility basics; data export; basic audit log | Allows a small instructor/learner pilot and produces credible evaluation data. |
| **P2: LMS platform** | Gradebook; enrolment; announcements/discussions; calendar/live sessions; certificates; SSO; LTI; SIS/HRIS; mobile; localisation; advanced reporting | Meets institutional expectations and supports integration instead of rip-and-replace adoption. |
| **P3: enterprise scale** | Multi-tenancy; SCIM; cmi5/xAPI; multi-language generation; skill ontology connectors; advanced policy controls; evaluation dashboard; regional storage; performance/uptime operations | Required for enterprise or district procurement, not the Build Week demo. |

## The demo story

1. An instructor imports one approved source and writes one learning outcome and rubric.
2. A learner answers a realistic prompt incorrectly and explains their reasoning with high confidence.
3. ProofPath shows the observed evidence and a *proposed* misconception—not an unexplained score.
4. The tutor gives a source-backed question and a partial scaffold instead of the answer.
5. The learner completes one targeted practice task and then a distinct transfer task.
6. The system marks the outcome **Verified** with the supporting evidence.
7. The instructor sees the cohort misconception pattern, approves a re-teach message, and can correct the model’s interpretation.

## What we will not claim

- That AI personalization is novel by itself.
- That a model can diagnose a learner perfectly or replace an instructor.
- That completion, chatbot engagement, or a dashboard proves learning.
- That the MVP is a drop-in Canvas/Moodle replacement.
- That the product improves outcomes before an evaluation with real learners is completed.

## Product positioning

**One sentence:** *ProofPath is the AI-native mastery layer that turns learner reasoning into verified understanding and teacher-ready action.*

**Initial go-to-market:** an interoperable mastery companion for a single high-value course, bootcamp, or workforce certification—not an institutional rip-and-replace LMS purchase.

**Why this matters:** It lets us beat incumbent breadth with a learning-quality wedge, gather evidence with a focused pilot, and later integrate into the platforms institutions already trust.

*Competitive review prepared July 17, 2026. Vendor capabilities are sourced from vendor documentation and may change; market position is segment-dependent.*
