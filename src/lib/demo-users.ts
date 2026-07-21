// Local authentication seam: mirrors the seeded users in features/lms/repository.ts.
// Replace with a real user directory once auth lands.
export type DemoUser = { id: string; name: string; email: string };

export const demoUsers: DemoUser[] = [
  { id: "user-maya", name: "Maya Chen", email: "maya@northstar.edu" },
  { id: "user-elena", name: "Dr. Elena Ruiz", email: "elena@northstar.edu" },
  { id: "user-jordan", name: "Jordan Lee", email: "jordan@northstar.edu" },
  { id: "user-sam", name: "Sam Rivera", email: "sam@example.com" },
];

export function demoUserById(id: string): DemoUser | undefined {
  return demoUsers.find((user) => user.id === id);
}

export function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}
