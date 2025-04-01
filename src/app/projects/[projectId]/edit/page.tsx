import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProjectForm from "./form";

type Props = {
  params: { projectId: string };
};

export default async function EditProjectPage({ params }: Props) {
  const { projectId } = params;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    notFound();
  }

  
  return (
    <div>
      <h1 className="font-bold text-center text-3xl">Edit project</h1>
      <EditProjectForm project={project} />
    </div>
  );
}
