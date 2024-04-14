import authOptions from "@/app/auth/authOptions";
import { IssueStatusBadge, Link } from "@/app/components";
import NextLink from "next/link";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import EditStatus from "../_components/EditStatus";
import IssueActions from "./IssueActions";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}
const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  // to get the current user session
  const session = await getServerSession(authOptions);

  // Validate the status before passing to prisma
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  // Validate the orderBy before passing to prisma
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy) // .includes() only pass with array of string
    ? { [searchParams.orderBy]: "asc" } // add [] to compute the property name dynamically at run time
    : undefined; // Prisma not include the undefine

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{ query: { ...searchParams, orderBy: column.value } }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
          <Table.Row></Table.Row>
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
