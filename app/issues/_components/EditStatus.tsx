"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
  status: Status;
  id: number;
}

const statusMap = [
  { value: "OPEN", item: "Open", color: "red" },
  { value: "IN_PROGRESS", item: "In Progress", color: "violet" },
  { value: "CLOSED", item: "Closed", color: "green" },
];

const EditStatus = ({ status, id }: Props) => {
  const [isloading, setLoading] = useState(false);
  const router = useRouter();
  const { handleSubmit, control } = useForm<Props>({
    defaultValues: { status },
  });
  const color =
    status === "OPEN" ? "red" : status === "IN_PROGRESS" ? "violet" : "green";

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await axios.patch("/api/issues/" + id, data);
      router.refresh();
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  });

  return (
    <form onChange={onSubmit}>
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select.Root
            disabled={isloading}
            defaultValue={status}
            size="1"
            onValueChange={field.onChange}
            {...field}
          >
            <Select.Trigger color={color} variant="soft" />
            <Select.Content color={color}>
              {statusMap.map((s) => (
                <Select.Item key={s.value} value={s.value}>
                  {s.item}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        )}
      />
    </form>
  );
};

export default EditStatus;
