import { NextRequest, NextResponse } from "next/server";
import { actorId, apiError } from "@/features/lms/http";
import { addMemberSchema } from "@/features/lms/schemas";
import { lmsService } from "@/features/lms/server";

export async function GET(request: NextRequest, context: { params: Promise<{ workspaceId: string }> }) {
  try {
    const { workspaceId } = await context.params;
    return NextResponse.json(lmsService.listMembers(actorId(request), workspaceId));
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest, context: { params: Promise<{ workspaceId: string }> }) {
  try {
    const { workspaceId } = await context.params;
    const input = addMemberSchema.parse(await request.json());
    return NextResponse.json(lmsService.addOrganizationMember(actorId(request), workspaceId, input.userId, input.role), { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
