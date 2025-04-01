"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().max(1000).optional(),
});

export async function createProject(prevState: unknown, formData: FormData) {
    const obj = Object.fromEntries(formData.entries());

    const result = createSchema.safeParse(obj);
    if (!result.success) {
        console.log(result.error.flatten());
        return {
            message: "Failed to create a project!",
            error: result.error.message,
        };
    }

    try {
        await prisma.project.create({
            data: {
                ...result.data,
                description: result.data.description ?? ""
            },
        });
    } catch (error) {
        console.log(error);
        return {
            message: "Failed to create a project!",
        };
    }

    redirect("/projects/{projectId}");
}
