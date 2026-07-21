export type Confidence = "low" | "medium" | "high";

export interface LearnerAttempt {
  id: string;
  outcomeId: string;
  answer: string;
  reasoning: string;
  confidence: Confidence;
  submittedAt: string;
}

export interface MisconceptionHypothesis {
  label: string;
  confidence: number;
  evidence: string;
  uncertainty: string;
}

export interface LearningOutcome {
  id: string;
  title: string;
  rubric: Array<{ id: string; label: string; description: string }>;
}

export interface ApprovedSource {
  title: string;
  locator: string;
  excerpt: string;
}
