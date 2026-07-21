import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { LmsError } from "./errors";

export function actorId(request: NextRequest): string {
  const value = request.headers.get("x-user-id");
  if (!value) throw new LmsError("UNAUTHENTICATED", "Send x-user-id to identify the current demo user.");
  return value;
}

export function apiError(error: unknown) {
  if (error instanceof ZodError) return NextResponse.json({ error: "BAD_REQUEST", message: "Request validation failed.", details: error.issues }, { status: 400 });
  if (error instanceof LmsError) {
    const status = { UNAUTHENTICATED: 401, FORBIDDEN: 403, NOT_FOUND: 404, CONFLICT: 409, BAD_REQUEST: 400 }[error.code];
    return NextResponse.json({ error: error.code, message: error.message }, { status });
  }
  console.error(error);
  return NextResponse.json({ error: "INTERNAL_ERROR", message: "Unexpected server error." }, { status: 500 });
}
