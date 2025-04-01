"use server"
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteTaskButton from "@/components/DeleteTaskButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Params = Promise<{
  taskId: string;
}>;
type Props = {
  params: Params;
};

export default async function TaskDetailsPage(props: Props) {
  const params = await props.params;
  const taskId = params.taskId;

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { project: true },
  });

  if (!task) {
    notFound();
  }

  const formattedCreateDate = task.createdAt.toLocaleDateString();
  const formattedUpdateDate = task.updatedAt.toLocaleDateString();

  return (
    <Card className="max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{task.title}</CardTitle>
        <p className="text-sm text-gray-500">Description: {task.description ?? "No description"}</p>
        <p className="text-sm text-gray-500">Status: {task.completed ? "✅ Completed" : "❌ Not Completed"}</p>
        <p className="text-sm text-gray-500">Created at: {formattedCreateDate}</p>
        <p className="text-sm text-gray-500">Last updated: {formattedUpdateDate}</p>
      </CardHeader>

      <CardContent>
        <div className="mt-6">
          <h3 className="text-lg font-medium">Project:</h3>
          <Link href={`/projects/${task.projectId}`}>
            {task.project.name}
          </Link>
        </div>

        <div className="mt-6 flex gap-4">
          <Button asChild variant="secondary">
            <Link href={`/tasks/${task.id}/edit`}>Edit task</Link>
          </Button>
          <DeleteTaskButton taskId={task.id} />
        </div>
      </CardContent>
    </Card>
  );
}
