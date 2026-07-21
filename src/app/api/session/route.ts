import { NextRequest, NextResponse } from "next/server";
import { actorId, apiError } from "@/features/lms/http";
import { lmsService } from "@/features/lms/server";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(lmsService.getSession(actorId(request)));
  } catch (error) {
    return apiError(error);
  }
}
