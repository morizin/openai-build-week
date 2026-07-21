export type Course = {
  code: string;
  title: string;
  instructor: string;
  color: "cyan" | "violet" | "amber" | "red";
  progress: number;
  next: string;
};

export type Assignment = {
  title: string;
  course: string;
  due: string;
  status: "In Progress" | "Submitted" | "Graded" | "Upcoming";
  points: string;
};

export const courses: Course[] = [
  {
    code: "CS301",
    title: "Data Structures & Algorithms",
    instructor: "Prof. Alan Ng",
    color: "cyan",
    progress: 78,
    next: "Lecture 12 · Graph traversal",
  },
  {
    code: "MATH210",
    title: "Linear Algebra",
    instructor: "Dr. Priya Sharma",
    color: "violet",
    progress: 64,
    next: "Problem set 6 due Thursday",
  },
  {
    code: "ENG150",
    title: "Technical Writing",
    instructor: "Dr. Lauren Cole",
    color: "amber",
    progress: 91,
    next: "Draft review · Peer workshop",
  },
  {
    code: "BIO220",
    title: "Cell Biology",
    instructor: "Prof. Marcus Webb",
    color: "red",
    progress: 52,
    next: "Lab report · Mitosis staining",
  },
];

export const assignments: Assignment[] = [
  {
    title: "Graph traversal problem set",
    course: "CS301",
    due: "Jul 21, 11:59 PM",
    status: "In Progress",
    points: "40 pts",
  },
  {
    title: "Linear transformations quiz",
    course: "MATH210",
    due: "Jul 22, 9:00 AM",
    status: "Upcoming",
    points: "25 pts",
  },
  {
    title: "Peer review draft",
    course: "ENG150",
    due: "Jul 23, 5:00 PM",
    status: "Upcoming",
    points: "15 pts",
  },
  {
    title: "Mitosis staining lab report",
    course: "BIO220",
    due: "Jul 24, 11:59 PM",
    status: "In Progress",
    points: "50 pts",
  },
  {
    title: "Binary search tree implementation",
    course: "CS301",
    due: "Jul 18, 11:59 PM",
    status: "Submitted",
    points: "40 pts",
  },
  {
    title: "Vector spaces homework",
    course: "MATH210",
    due: "Jul 15, 9:00 AM",
    status: "Graded",
    points: "25 pts",
  },
];
