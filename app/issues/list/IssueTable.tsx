import authOptions from "@/app/auth/authOptions";
import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { default as Link, default as NextLink } from "next/link";
import EditStatus from "../_components/EditStatus";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue; // use "keyof" operator to get the union of all properties which are strings
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  // to get the current user session
  const session = await getServerSession(authOptions);

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
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
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
