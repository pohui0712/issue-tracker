import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { describe } from "node:test";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // validation the body of request
  const body = await request.json();

  // vadiation with shemca
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Update with specific id
  const updateIssue = await prisma.issue.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updateIssue);
}
