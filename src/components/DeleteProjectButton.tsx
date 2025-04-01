"use client";
import { deleteProject } from "@/actions/project";
import { useState } from "react";
import { Button } from "./ui/button";


interface DeleteProjectButtonProps {
    projectId:string;
}

export default function DeleteProjectButton({projectId}:DeleteProjectButtonProps) {
  const [isPending, setIsPending] = useState(false);

  
  async function handleClick(){
    const result = confirm("Are you sure you want to delete this project?");
   if(!result) return;
   setIsPending(true);

    await deleteProject(projectId);
    setIsPending(false);
  }
    return (
    <Button variant={"destructive"} onClick={handleClick}  disabled={isPending}> {isPending? "Deleting...":"Delete"}
  </Button>  )
}
