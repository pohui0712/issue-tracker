"use client";

import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = () => {
  // with React Query, no longer to use state and effect hooks
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["Users"], // used fot uniquely identifying a piece of data in the cache
    queryFn: () => axios.get("/api/users").then((res) => res.data), // function used to fetching data
    staleTime: 60 * 1000, //60s
    retry: 3, /// React query automatically retry up to 3 times to fetch data
  });

  if (isLoading) return <Skeleton />;
  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
