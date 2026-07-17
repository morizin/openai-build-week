# ProofPath — Evidence-informed product brief

**Purpose.** This brief explains the learning-science rationale for ProofPath, an AI-native learning platform that helps instructors discover misconceptions, guide practice, and verify mastery through new evidence.

**Research note.** These findings guide the product hypothesis and evaluation plan. They are not claims that ProofPath itself has already produced the cited outcomes.

## The problem with conventional LMSs

Most learning platforms record activity: pages viewed, videos completed, and quiz scores. Activity is not the same as understanding. A useful learning system needs to surface *why* an answer is wrong, help a learner repair the underlying model, and show an instructor the next action to take.

This is especially important because a 2024 systematic review of 38 studies found insufficient evidence that learning-analytics dashboards alone improve academic achievement. A dashboard should therefore drive a specific instructional action, not simply display engagement data. [Kaliisa et al., 2024](https://saqr.me/publication/2024-kaliisa-learning-analytics-lived-hype/)

## Evidence → product decisions

| Evidence | Product decision | What a learner or instructor sees |
| --- | --- | --- |
| Retrieval practice produces more durable conceptual learning than elaborative studying with concept maps in a controlled experiment. [Karpicke & Blunt, 2011](https://pubmed.ncbi.nlm.nih.gov/21252317/) | Prefer explanation, prediction, and short-answer practice to passive content consumption. | “Explain why you chose this answer” before the tutor responds. |
| Explicitly confronting a high-confidence misconception with a refutation can improve correction relative to standard explanatory text. [“Refutations in science texts…,” 2015](https://www.sciencedirect.com/science/article/pii/S0361476X15000235) | Diagnose the *reasoning error*, record confidence, and contrast the misconception with the correct model. | “You treated variance as a measure of average. Here is the counterexample.” |
| Feedback is powerful but can help or harm; useful feedback answers where the learner is going, how they are doing, and what to do next. [Hattie & Timperley, 2007](https://doi.org/10.3102/003465430298487) | Feedback must be actionable and tied to the rubric, not generic praise or a bare correctness label. | A next-step hint, a worked comparison, and one targeted practice task. |
| A review found step-based intelligent tutors can approach the effectiveness of human tutoring under the right conditions. [VanLehn, 2011](https://www.public.asu.edu/~kvanlehn/Stringent/PDF/EffectivenessOfTutoring_Vanlehn.pdf) | Make AI interaction structured: assess → diagnose → scaffold → practice → verify. Do not ship an unbounded chat box as the learning experience. | A guided tutoring sequence with an explicit mastery state. |
| A randomized real-world trial of Tutor CoPilot found students with AI-assisted tutors were four percentage points more likely to master math topics; the largest gains were with lower-rated tutors. [Wang et al., 2025](https://edworkingpapers.com/ai24-1054) | Augment instructors and tutors with evidence and suggested questions; retain human oversight for consequential interventions. | An intervention queue with evidence, suggested prompt, and teacher approval. |
| UNESCO’s guidance calls for human-centred use of generative AI and protection of learner data privacy. [UNESCO, 2023](https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research?hub=195885) | Make provenance, consent, minimal data collection, teacher control, and reviewability core product requirements. | Source-backed tutor responses, visible AI label, export/delete controls, and no hidden high-stakes automated decisions. |

## The ProofPath learning loop

1. **Attempt.** A learner solves an authentic prompt and explains their reasoning.
2. **Diagnose.** The system maps the answer to a teacher-defined learning outcome and a possible misconception, with an evidence snippet and confidence level.
3. **Coach.** The tutor gives a Socratic, rubric-grounded next step—not the final answer by default.
4. **Practice.** The learner receives a brief, targeted retrieval task or simulation.
5. **Verify.** Mastery is checked on a *new* prompt requiring transfer, not on a repeated question.
6. **Intervene.** The instructor sees only action-ready signals: who is stuck, on which concept, with what evidence, and the recommended next move.

## What makes it different

| Typical LMS | ProofPath |
| --- | --- |
| Tracks completion | Tracks evidence of understanding |
| One course sequence for everyone | Routes by demonstrated misconception and prerequisite |
| AI chat answers questions | AI elicits reasoning, coaches, and verifies transfer |
| Teacher sees activity heat maps | Teacher sees a small, explainable intervention queue |
| Quiz score is the end state | New-task performance is the mastery signal |

## Evaluation plan

The MVP will measure whether the loop is useful before making learning-outcome claims:

- **Learning:** pre-check, targeted practice, and delayed transfer item; report change transparently.
- **Quality of diagnosis:** instructor agreement with the proposed misconception and rubric mapping.
- **Tutor quality:** rate whether feedback is grounded, actionable, appropriately challenging, and avoids giving away the answer.
- **Teacher value:** time from first learner error to a usable intervention recommendation.
- **Safety:** source coverage, flagged unsupported claims, data collected, and teacher overrides.

## Build Week demo claim

> **LMSs measure completion. ProofPath verifies understanding.**

In the demo, an instructor creates one outcome and rubric, a learner makes a plausible wrong attempt, the AI identifies the misconception and asks a targeted question, the learner completes a fresh transfer task, and the teacher sees a verified-mastery update. The product demonstrates the complete evidence loop rather than a large but shallow LMS feature list.

*Research brief prepared July 17, 2026. Sources are linked inline.*
