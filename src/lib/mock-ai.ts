import type { LearnerAttempt, MisconceptionHypothesis } from "./domain";

/** Deterministic demo adapter. This intentionally never calls a model or external service. */
export const mockDiagnosisAdapter = {
  async diagnose(attempt: LearnerAttempt): Promise<MisconceptionHypothesis> {
    const evidence = attempt.reasoning.trim() || attempt.answer.trim();
    return {
      label: "Mean and median treated as interchangeable",
      confidence: 0.89,
      evidence,
      uncertainty: "This response shows a plausible rule about using all values, but it does not yet show whether the learner can identify when an extreme value makes the mean unrepresentative.",
    };
  },
};
