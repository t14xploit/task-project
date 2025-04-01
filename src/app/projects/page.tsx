import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
export default async  function ProjectsPage() {

    
const projects = await prisma.project.findMany();
return (
    <>
<div className="max-w-4xl mx-auto m-12 ">
  <div className="flex justify-between ">
  <h1 className="text-3xl font-bold ">
Projects List  </h1>

    <Link href="/projects/new">
    <Button>

    New Project
    </Button>
    </Link> 
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
  {projects.map((project)=>(
<ProjectCard key={project.id} project={project}/>
  ))}
  </div>

</div>
</>
  );
}



