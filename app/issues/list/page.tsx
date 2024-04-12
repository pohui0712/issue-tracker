import authOptions from "@/app/auth/authOptions";
import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import EditStatus from "../_components/EditStatus";
import IssueActions from "./IssueActions";

const IssuesPage = async () => {
  // to get the current user session
  const session = await getServerSession(authOptions);

  const issues = await prisma.issue.findMany();

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  {session ? (
                    <EditStatus status={issue.status} id={issue.id} />
                  ) : (
                    <IssueStatusBadge status={issue.status} />
                  )}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {session ? (
                  <EditStatus status={issue.status} id={issue.id} />
                ) : (
                  <IssueStatusBadge status={issue.status} />
                )}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

// force dynamic rendering
export const dynamic = "force-dynamic";

export default IssuesPage;
