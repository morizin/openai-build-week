import { NextRequest, NextResponse } from "next/server";
import { actorId, apiError } from "@/features/lms/http";
import { createCourseSchema } from "@/features/lms/schemas";
import { lmsService } from "@/features/lms/server";

export async function GET(request: NextRequest) {
  try {
    const workspaceId = request.nextUrl.searchParams.get("workspaceId");
    if (!workspaceId) return NextResponse.json({ error: "BAD_REQUEST", message: "workspaceId is required." }, { status: 400 });
    return NextResponse.json(lmsService.listCourses(actorId(request), workspaceId));
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const input = createCourseSchema.parse(await request.json());
    return NextResponse.json(lmsService.createCourse(actorId(request), input), { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
