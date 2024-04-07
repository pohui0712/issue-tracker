import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  // Fetch the issue details with id
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  // Validate the id
  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <div className="space-x-3 my-2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
