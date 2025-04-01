"use server";
import {prisma} from "@/lib/prisma";
import { redirect } from "next/navigation";


export async function deleteTask(taskId: string){
    await prisma.task.delete({
        where:{
            id:taskId
        }
    });
    redirect("/projects");
}