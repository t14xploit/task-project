import { Project } from "@prisma/client";
import Link from "next/link";

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

        <Link href={`/projects/${project.id}`} className="block text-center text-xl font-bold text-white bg-emerald-500 px-6 py-3 rounded-lg shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ">Details</Link>
    </div>
  )
}
