# Learning science research library for ProofPath

This is the evidence base for an AI-native learning platform. It is intentionally broader than a feature list: it covers cognitive mechanisms, instruction, assessment, motivation, social context, accessibility, analytics, and responsible AI.

**How to read this.** “Evidence strength” is a product-research judgment, not a clinical or regulatory classification. It signals how cautiously we should make product claims. A linked study supports the design principle; it does **not** prove that ProofPath produces the same effect before it is evaluated with learners.

## Product thesis

> Learning improves when learners retrieve, explain, receive actionable feedback, practice again, and demonstrate transfer—while instructors retain the context and authority to act on the evidence.

The platform should optimize the loop below, not content consumption or a generic AI chat experience:

`attempt → reasoning evidence → diagnosis → scaffold → retrieval practice → transfer check → instructor action`

## Research map

| Domain | What the research says | Product implication | Evidence strength |
| --- | --- | --- | --- |
| **Retrieval practice** | Retrieval practice improved conceptual learning relative to elaborative concept mapping in a controlled study. [Karpicke & Blunt, 2011](https://pubmed.ncbi.nlm.nih.gov/21252317/) | Ask learners to predict, solve, explain, or teach back before showing feedback. Do not equate “read” with “learned.” | Strong |
| **Spacing** | A quantitative synthesis found a distributed-practice advantage and examined the timing of study intervals. [Cepeda et al., 2006](https://pubmed.ncbi.nlm.nih.gov/16719566/) | Schedule return practice; surface a short review when a skill is due, rather than putting all practice in the first lesson. | Strong |
| **Interleaving** | A meta-analysis covering 59 studies examined when mixed rather than blocked practice helps; similarity between categories is an important moderator. [Brunmair & Richter, 2019](https://pubmed.ncbi.nlm.nih.gov/31556629/) | Mix confusable problem types once foundations are in place, and ask learners to identify which method applies. Do not interleave unrelated novice content indiscriminately. | Moderate–strong |
| **Study strategies** | A major review examined 10 common learning techniques and their utility across students, materials, and tasks. [Dunlosky et al., 2013](https://www.psychologicalscience.org/publications/journals/pspi/learning-techniques.html) | Make practice testing, distributed practice, explanation, and planning the default study tools; do not overvalue re-reading, highlighting, or “time spent.” | Strong |
| **Misconceptions** | Refutation texts that activate a misconception and then correct it improved correction of high-confidence misconceptions over standard text in a school science study. [“Refutations in science texts…,” 2015](https://www.sciencedirect.com/science/article/pii/S0361476X15000235) | Capture an explanation and confidence rating; name the specific misconception; contrast it with a counterexample and a correct principle. | Moderate |
| **Cognitive load & worked examples** | Cognitive-load research centers limited working-memory capacity; worked examples and segmentation can reduce unnecessary load, especially for novices. [van Gog, Paas & Sweller, 2010](https://link.springer.com/article/10.1007/s10648-010-9145-4) | Start novices with concise worked examples, then fading prompts and partial problems. Keep one concept per screen and avoid decorative or competing information. | Strong for novice procedural learning |
| **Feedback** | Feedback can improve or impair learning; high-value feedback addresses the goal, current performance, and next move. [Hattie & Timperley, 2007](https://doi.org/10.3102/003465430298487) | Never return just a score. Give an outcome/rubric reference, a diagnosis anchored in evidence, and one next practice action. Avoid personality judgments and generic praise. | Strong |
| **Formative assessment** | A foundational review found evidence that frequent feedback and formative assessment innovations can produce meaningful learning gains. [Black & Wiliam, 1998](https://assess.ucr.edu/sites/default/files/2019-02/blackwiliam_1998.pdf) | Make every learning interaction a low-stakes diagnostic signal, then visibly alter the next step for learner or teacher. | Strong |
| **Mastery & transfer** | Assessment research supports using formative evidence to guide instruction; a repeated item only demonstrates answer recall, not necessarily understanding. The product will treat fresh, structurally related problems as the product-level mastery check. [Black & Wiliam, 1998](https://assess.ucr.edu/sites/default/files/2019-02/blackwiliam_1998.pdf) | Require a new prompt, changed surface details, and an explanation before showing “verified.” Record the evidence and threshold, not a black-box mastery label. | Strong principle; validate threshold locally |
| **Tutoring** | A review reports that step-based intelligent tutoring systems can approach the effectiveness of human tutoring in the studied conditions. [VanLehn, 2011](https://www.public.asu.edu/~kvanlehn/Stringent/PDF/EffectivenessOfTutoring_Vanlehn.pdf) | Model the tutor as a guided sequence with goals, steps, hints, and practice—not free-form conversation that supplies answers. | Strong, context-dependent |
| **Human + AI tutoring** | In a randomized field trial with more than 700 tutors and 1,000 students, Tutor CoPilot users’ students were four percentage points more likely to master math topics; analysis found more probing questions and less generic praise. [Wang et al., 2025](https://edworkingpapers.com/ai24-1054) | Build an instructor/tutor copilot: suggested probing question, evidence, and teacher approval. Do not automate consequential placement or grading decisions. | Promising; one setting |
| **High-impact tutoring** | A systematic review and meta-analysis synthesizes experimental evidence on PreK–12 tutoring. [Nickow, Oreopoulos & Quan](https://www.nber.org/papers/w27476.pdf) | Use AI to make timely, targeted human intervention more feasible; preserve the option to escalate a learner to a teacher or tutor. | Strong for tutoring broadly |
| **Self-regulated learning** | Meta-analytic work on online and blended learning examines goal-setting, monitoring, motivation, and other self-regulation strategies. [2024 meta-analysis](https://files.eric.ed.gov/fulltext/EJ1446717.pdf) | Give learners a goal, short plan, progress reflection, and a “what should I do next?” recommendation. Make it optional and lightweight rather than surveillance. | Moderate–strong |
| **Motivation & agency** | Self-determination research centers autonomy, competence, and relatedness; a meta-analysis of education interventions examines these needs. [Wang et al., 2024](https://selfdeterminationtheory.org/wp-content/uploads/2024/06/2024_WangWangEtAl_MetaEdu.pdf) | Offer meaningful choices of practice context/format, show real competence growth, and support teacher/peer connection. Do not rely on streaks, badges, or pressure as the core motivation mechanism. | Moderate–strong |
| **Collaboration** | Cooperative-learning evidence is broad but highly dependent on task and implementation; recent second-order synthesis continues to examine achievement, higher-order thinking, and affect. [2025 second-order meta-analysis](https://doi.org/10.1007/s12144-025-08943-0) | Add peer explanation/review only when roles, rubric, and accountability are clear. It is not an MVP requirement. | Moderate, implementation-sensitive |
| **Accessibility** | WCAG 2.2 is the international, testable web-accessibility standard and includes needs related to visual, auditory, motor, speech, cognitive, language, and learning disabilities. [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Meet WCAG 2.2 AA where feasible: keyboard operation, visible focus, contrast, semantic structure, captions/transcripts, readable errors, and no time-only completion gates. | Required design standard |
| **Universal Design for Learning** | A recent systematic review reports ongoing definition, implementation, and evidence limitations for UDL. [“Unraveling Challenges with the Implementation of UDL,” 2024](https://link.springer.com/article/10.1007/s10648-024-09860-7) | Provide flexible representation and response options, but do not claim “UDL personalization” guarantees outcomes. Evaluate with real learners and accessibility specialists. | Promising; evidence limitations |
| **Learning analytics** | A 2024 systematic review of 38 studies found insufficient evidence that dashboards by themselves improve academic achievement. [Kaliisa et al., 2024](https://saqr.me/publication/2024-kaliisa-learning-analytics-lived-hype/) | Replace activity dashboards with a small action queue: misconception, evidence, confidence, suggested intervention, and result after intervention. | Strong caution |
| **Learning styles** | A review found virtually no evidence for the interaction pattern required to justify matching instruction to a learner’s supposed style. [Pashler et al., 2009](https://www.psychologicalscience.org/journals/pspi/j.1539-6053.2009.01038.x/) | Never label a learner “visual,” “auditory,” or “kinesthetic” and route instruction on that basis. Offer accessibility and format choice without making diagnostic claims. | Strong caution |
| **Privacy** | U.S. Department of Education guidance addresses third-party online education providers’ responsibilities under FERPA. [Student Privacy Policy Office](https://studentprivacy.ed.gov/resources/responsibilities-third-party-service-providers-under-ferpa) | Collect only what the learning loop needs; document data flow, role access, retention/deletion, and use of student content. Obtain appropriate institutional agreement before school deployment. | Governance requirement |
| **Responsible AI** | UNESCO calls for human-centred use and learner-data privacy; NIST’s AI RMF organizes risk management around trustworthy AI. [UNESCO](https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research?hub=195885) · [NIST AI RMF](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) | Show sources and uncertainty, allow teacher override, test for unsupported feedback and bias, keep an audit trail, and provide a reporting path. | Governance requirement |

## What this means for the MVP

### Must-have learning mechanics

1. **Outcome and rubric first.** Every task maps to an instructor-defined outcome and criteria.
2. **Reasoning capture.** Learners explain an answer, optionally rate confidence, and may upload a work artifact.
3. **Evidence-grounded diagnosis.** The system separates observed evidence from its tentative misconception hypothesis; it displays both.
4. **Scaffold before answer.** Tutor defaults to a targeted question, partial worked example, or hint. The full solution is a deliberate learner choice after an attempt.
5. **Short retrieval practice.** Follow feedback with a new, focused question, then schedule a later review.
6. **Transfer verification.** “Verified” requires a distinct prompt that tests the same underlying outcome.
7. **Teacher intervention queue.** Instructors receive concise, reviewable recommendations—not a risk score without context.
8. **Agency and accessibility.** Learners control pacing and can choose supported formats; the system maintains keyboard, caption, contrast, and readable-language standards.

### AI guardrails

- Ground tutor feedback in the course rubric and approved source material; cite the material inside the product.
- Do not state that a learner has a disability, emotion, learning style, or immutable ability.
- Do not use AI alone for high-stakes grades, placement, discipline, or admissions decisions.
- Mark generated feedback as AI-assisted; show why the diagnosis was proposed and enable teacher correction.
- Keep learners’ raw work private by default; minimize retention and enable role-appropriate deletion/export.
- Evaluate the model with deliberately wrong, incomplete, adversarial, and multilingual learner responses before demoing it.

## Claims we can responsibly make

### In the Build Week demo

- “ProofPath is designed around retrieval practice, formative assessment, actionable feedback, and transfer verification.”
- “The system makes a proposed misconception and its supporting learner evidence visible to the instructor.”
- “We designed the product to augment teacher judgment, not automate consequential decisions.”

### Only after a real evaluation

- “ProofPath improves learning outcomes.”
- “ProofPath reduces instructor workload.”
- “ProofPath reduces equity gaps.”
- “The AI diagnoses misconceptions accurately.”

Those require a pre-registered or clearly described pilot: baseline/transfer outcomes, instructor agreement on diagnosis, feedback-quality review, completion and time measures, subgroup analysis where appropriate, and learner/teacher consent.

## Suggested evaluation scorecard

| Metric | How to measure it | Success signal |
| --- | --- | --- |
| Transfer learning | Score a fresh post-practice item against the rubric | Improvement over pre-check, reported with sample size |
| Diagnostic accuracy | Teacher labels whether the proposed misconception matches the learner evidence | Agreement rate and examples of disagreement |
| Tutor quality | Human raters assess grounding, actionability, challenge level, and answer leakage | High grounded/actionable rating; low unsupported feedback |
| Intervention usefulness | Time from learner error to teacher-approved next action | Faster action without removing teacher control |
| Equity & access | Accessibility testing plus qualitative learner feedback | No critical WCAG issues; identify gaps before claims |
| Safety | Red-team prompts and audit review | Unsupported outputs are flagged; override and reporting work |

## Research limitations to state openly

- Effects vary by learner, subject, age, setting, teacher implementation, and assessment type.
- AI-tutoring evidence is still emerging; a positive trial in one context is not universal proof.
- Engagement, completion, satisfaction, and chat volume are not direct measures of durable learning.
- Dashboard access is not an intervention; the action that follows matters.
- Accessibility is an ongoing co-design and testing obligation, not a checklist that guarantees inclusion.

*Research library prepared July 17, 2026. Linked sources were selected for authority, review methods, primary evidence, or applicable standards.*
