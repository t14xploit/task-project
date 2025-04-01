import { Project } from "@prisma/client";
import Link from "next/link";
import { Button } from "./ui/button";

interface ProjectCardProps{
    project:Project;
}    


export default function ProjectCard({project}:ProjectCardProps) {
    const formattedDate = project.createdAt.toLocaleDateString();

    return (
    <div className="p-8 space-y-4 rounded-lg shadow-lg border ">
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <h3 className="text-lg text-gray-400">{project.description}</h3>
        <p className="text-sm text-gray-300">Created: {formattedDate}</p>
<Button asChild>

        <Link href={`/projects/${project.id}`} >Details</Link>
</Button>
    </div>
  )
}
