"use client";

import { deleteTask } from "@/actions/task";
import { useState } from "react";
import { Button } from "./ui/button";

interface DeleteTaskButtonProps {
  taskId: string;
}

export default function DeleteTaskButton({
  taskId,
}: DeleteTaskButtonProps) {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    const result = confirm("Are you sure you want to delete this task?");
    if (!result) return;

    setIsPending(true);
    await deleteTask(taskId);
    setIsPending(false);
  }

  return (
    <Button variant="destructive" onClick={handleClick} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete task"}
    </Button>
  );
}
