import type { ApprovedSource, LearningOutcome } from "./domain";

export const outcome: LearningOutcome = {
  id: "outcome-resistant-statistics",
  title: "Choose and justify an appropriate measure of center",
  rubric: [
    { id: "identify-outlier", label: "Identify influential values", description: "Recognize when an extreme observation can distort a summary." },
    { id: "select-measure", label: "Select a resistant measure", description: "Choose a measure of center that represents the typical value in context." },
    { id: "justify-choice", label: "Justify with evidence", description: "Explain how the distribution supports the selected measure." },
  ],
};

export const source: ApprovedSource = {
  title: "Data Literacy Foundations",
  locator: "Lesson 04 · Measures of center",
  excerpt: "The median is resistant: changing an extreme value does not change the middle observation. The mean uses every value, so it can be pulled toward an outlier.",
};
