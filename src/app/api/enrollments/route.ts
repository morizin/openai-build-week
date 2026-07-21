import { NextRequest, NextResponse } from "next/server";
import { actorId, apiError } from "@/features/lms/http";
import { enrollStudentSchema } from "@/features/lms/schemas";
import { lmsService } from "@/features/lms/server";

export async function POST(request: NextRequest) {
  try {
    const input = enrollStudentSchema.parse(await request.json());
    return NextResponse.json(lmsService.enrollStudent(actorId(request), input), { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
