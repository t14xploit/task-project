import TaskCreateForm from "./form";

type Params = {
  projectId: string;
}; 

export default function TaskCreatePage({ params }: { params: Params }) {
  const { projectId } = params;
   return( <div> 
      <h1>Page to create a task</h1>
      <TaskCreateForm projectId={projectId}/>
    </div>
  )
}
