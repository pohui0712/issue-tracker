import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}
const IssuesPage = async ({ searchParams }: Props) => {
  // Validate the status before passing to prisma
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  // Validate the orderBy before passing to prisma
  const orderBy = columnNames.includes(searchParams.orderBy) // .includes() only pass with array of string
    ? { [searchParams.orderBy]: "asc" } // add [] to compute the property name dynamically at run time
    : undefined; // Prisma not include the undefine

  const page = parseInt(searchParams.page) || 1; // default value of 1
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize, // the number of record should be skipped
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

// force dynamic rendering
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  // minimun: title, description
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
