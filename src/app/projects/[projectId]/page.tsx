"use client";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link"; // Import Link for navigation
import { Button } from "@/components/ui/button";
import DeleteProjectButton from "@/components/DeleteProjectButton";

type Params = Promise<{
  projectId: string;
}>;

type Props = {
  params: Params;
};

export default async function ProjectDetailsPage(props: Props) {
  const params = await props.params;
  const projectId = params.projectId;

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: { tasks: true },
  });

  if (!project) {
    notFound();
  }

  const formattedDate = project.createdAt.toLocaleDateString();

  return (
    <>
      <div>
        <h3 className="text-xl font-bold text-white">{project.name}</h3>
        <p className="mt-4 text-sm text-gray-300">Created at: {formattedDate}</p>
        
        <div className="mt-4">
          <Link href={`/projects/${projectId}/tasks/create`}>
            <Button >
              Create Task
            </Button>
          </Link>
        </div>

        <h3 className="mt-6">Tasks:</h3>
        {project.tasks.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {project.tasks.map((task) => (
              <li key={task.id} className="p-2 rounded-md text-gray-200">
                <h5>{task.title}</h5>
                <p className="text-sm text-gray-400">{task.description}</p>
                <p className="text-xs text-gray-500">
                  {task.completed ? "✅ Completed" : "❌ Not Completed"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No tasks available.</p>
        )}
        <DeleteProjectButton projectId={project.id}/>
      </div>
    </>
  );
}
