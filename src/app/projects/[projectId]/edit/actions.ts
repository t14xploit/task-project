"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const editSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().max(1000).optional(),
});

export async function editProject(projectId: string, prevState: unknown, formData: FormData) {
    const obj = Object.fromEntries(formData.entries());

    const result = editSchema.safeParse(obj);
    if (!result.success) {
        console.log(result.error.flatten());
        return {
            message: "Failed to update the project!",
            error: result.error.message,
        };
    }

    try {
        await prisma.project.update({
            where: { id: projectId },
            data: {
                name: result.data.name,
                description: result.data.description ?? ""
            },
        });
    } catch (error) {
        console.log(error);
        return {
            message: "Failed to update the project!",
        };
    }

    redirect(`/projects/${projectId}`);
}
