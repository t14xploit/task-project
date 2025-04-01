"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { createTask } from "./actions";

export default function TaskCreateForm({ projectId }: { projectId: string }) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(
    createTask.bind(null, projectId),
    { message: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="space-y-4 max-w-4xl mx-auto"
      action={formAction}
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(() => {
          formAction(new FormData(e.target as HTMLFormElement));
        });
      }}
    >
      {state.message && (
        <div className="mt-4 text-red-600">{state.message}</div>
      )}

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={taskData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex gap-2">
        <Checkbox name="completed" id="completed"/>
        <Label htmlFor="completed"> Completed:</Label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
