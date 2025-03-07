
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { Task } from '../../../models/task';

export const GET = async (req: Request) => {
  try {
    const db = await connectToDatabase();
    const tasks = await db.collection<Task>('tasks').find().toArray();

    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { name, description, status, userId }: Task = await req.json();

    const db = await connectToDatabase();
    const result = await db.collection<Task>('tasks').insertOne({
      name,
      description,
      status,
      userId,
    });

    return NextResponse.json({ task: result.ops[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const { _id, name, description, status }: Task = await req.json();

    const db = await connectToDatabase();
    const result = await db.collection<Task>('tasks').updateOne(
      { _id },
      { $set: { name, description, status } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: 'Task not found or no changes made' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Task updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { _id }: { _id: string } = await req.json();

    const db = await connectToDatabase();
    const result = await db.collection<Task>('tasks').deleteOne({ _id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting task' }, { status: 500 });
  }
};