"use server"
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link"; 
import { Button } from "@/components/ui/button";
import DeleteProjectButton from "@/components/DeleteProjectButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 


type Params = Promise<{
    projectId: string
}>;
type Props = {
    params: Params
}
export default async function ProjectDetailsPage( props:Props) {
const params = await props.params;
const projectId = params.projectId;
    const project = await prisma.project.findUnique({
    where: { id: projectId ,},
    include: { tasks: true },
  });

  if (!project) {
    notFound();
  }

  const formattedDate = project.createdAt.toLocaleDateString();

  return (
    <Card className="max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{project.name}</CardTitle>
        <p className="text-sm text-gray-500">Created at: {formattedDate}</p>
      </CardHeader>
      <CardContent>
        <Link href={`/projects/${project.id}/tasks/create`}>
          <Button variant="secondary">Create Tasks</Button>
        </Link>

        <div className="mt-6">
          <h3 className="text-lg font-medium">Tasks:</h3>
          {project.tasks.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {project.tasks.map((task) => (
                <li key={task.id} className="p-4 bg-gray-800 rounded-md text-gray-200">
                  <h5 className="font-semibold">{task.title}</h5>
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
        </div>

        <div className="mt-6 flex gap-4">
        <Button asChild variant="secondary">
          <Link href={`/projects/${project.id}/edit`}>Edit project</Link>
        </Button>
          <DeleteProjectButton projectId={project.id} />
        </div>
      </CardContent>
    </Card>
  );
}
