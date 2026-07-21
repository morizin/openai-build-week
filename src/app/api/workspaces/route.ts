import { NextRequest, NextResponse } from "next/server";
import { actorId, apiError } from "@/features/lms/http";
import { createWorkspaceSchema } from "@/features/lms/schemas";
import { lmsService } from "@/features/lms/server";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(lmsService.getSession(actorId(request)).workspaces);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const input = createWorkspaceSchema.parse(await request.json());
    return NextResponse.json(lmsService.createWorkspace(actorId(request), input), { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
