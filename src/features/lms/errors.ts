export class LmsError extends Error {
  constructor(
    public readonly code: "NOT_FOUND" | "FORBIDDEN" | "CONFLICT" | "BAD_REQUEST" | "UNAUTHENTICATED",
    message: string,
  ) {
    super(message);
  }
}
