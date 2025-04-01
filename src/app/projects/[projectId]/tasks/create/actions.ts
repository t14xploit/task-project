
"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

// Task schema validation
const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().max(1000).optional(),
  completed: z.coerce.boolean()
});

export async function createTask(projectId: string, prevState: unknown, formData: FormData) {
  const obj = Object.fromEntries(formData.entries());

  const result = taskSchema.safeParse(obj);

  if (!result.success) {
    console.log(result.error.flatten());
    return {
      message: "Failed to create a task",
      error: result.error.message,
    };
  }
let taskId:string;
  try {
    const task = await prisma.task.create({
      data: {
        title: result.data.title,
        description: result.data.description ?? "",
        completed:result.data.completed,
        projectId: projectId, 
      },
    });

   
    taskId= task.id;


  } catch (error) {
    console.log(error);
    return {
      message: "Failed to create a task!",
    };
  }
redirect(`/projects/${projectId}/tasks/${taskId}`);

}
