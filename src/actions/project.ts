"use server";
import {prisma} from "@/lib/prisma";
import { redirect } from "next/navigation";


export async function deleteProject(projectId: string){
    await prisma.project.delete({
        where:{
            id:projectId
        }
    });
    redirect("/books");
}