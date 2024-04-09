import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // validation the body of request
  const body = await request.json();

  /** 
    ----> Not need to apply as 'IssueForm' is alraady use 'schema' to validate
    // // vadiation with shemca
    // const validation = issueSchema.safeParse(body);

    // if (!validation.success)
    //   return NextResponse.json(validation.error.format(), { status: 400 });
  **/

  // Update with specific id
  const updateIssue = await prisma.issue.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
    },
  });

  return NextResponse.json(updateIssue);
}
