import { NextRequest, NextResponse } from "next/server";
import { actorId, apiError } from "@/features/lms/http";
import { enrollStudentSchema } from "@/features/lms/schemas";
import { lmsService } from "@/features/lms/server";

export async function GET(request: NextRequest) {
  try {
    const workspaceId = request.nextUrl.searchParams.get("workspaceId");
    if (!workspaceId) return NextResponse.json({ error: "BAD_REQUEST", message: "workspaceId is required." }, { status: 400 });
    const courseId = request.nextUrl.searchParams.get("courseId") ?? undefined;
    return NextResponse.json(lmsService.listEnrollments(actorId(request), workspaceId, courseId));
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const input = enrollStudentSchema.parse(await request.json());
    return NextResponse.json(lmsService.enrollStudent(actorId(request), input), { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
