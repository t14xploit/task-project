"use client";

import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { editProject } from "./actions";

type EditProjectFormProps = {
  project: { id: string; name: string; description: string };
};

export default function EditProjectForm({ project }: EditProjectFormProps) {
  const [state, formAction, isPending] = useActionState(
    editProject.bind(null, project.id),
    { message: "" }
  );

  return (
    <form className="space-y-4 max-w-4xl mx-auto" action={formAction}>
      {state.message && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <div>
        <Label htmlFor="name">Name</Label>
        <Input name="name" type="text" id="name" defaultValue={project.name} required />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" defaultValue={project.description} required />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Project"}
        </Button>
        <Button asChild variant="secondary">
          <Link href="/">Go back</Link>
        </Button>
      </div>
    </form>
  );
}
