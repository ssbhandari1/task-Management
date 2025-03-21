import { NextResponse } from "next/server";
import { deleteTask, updateTask } from "@/services/task";

export async function DELETE(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const { taskId } = params;

    if (!taskId) {
      return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
    }

    const deletedTask = await deleteTask(taskId);

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error deleting task" }, { status: 500 });
  }
}



export async function PUT(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const { taskId } = params;
    const { title, description, status, dueDate } = await req.json();

    if (!taskId) {
      return NextResponse.json({ message: "Task ID is not found" }, { status: 400 });
    }

    if (!title || !description || !status || !dueDate) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const updatedTask = await updateTask(taskId, { title, description, status, dueDate });

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error updating task" }, { status: 500 });
  }
}
