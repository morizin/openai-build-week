import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { actorId, apiError } from "@/features/lms/http";
import { lmsService } from "@/features/lms/server";

export async function POST(request: NextRequest, context: { params: Promise<{ courseId: string }> }) {
  try {
    const { courseId } = await context.params;
    const { workspaceId } = z.object({ workspaceId: z.string().min(1) }).parse(await request.json());
    return NextResponse.json(lmsService.publishCourse(actorId(request), workspaceId, courseId));
  } catch (error) {
    return apiError(error);
  }
}
