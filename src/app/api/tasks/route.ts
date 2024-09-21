import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Task from '@/models/Task';
import { getToken } from 'next-auth/jwt';

export async function GET(request: Request) {
  const token = await getToken({ req: request as any });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();

  const tasks = await Task.find({ userId: token.id });

  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const token = await getToken({ req: request as any });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, description, status, priority, dueDate } = await request.json();

  await connectToDatabase();

  const task = new Task({
    userId: token.id,
    title,
    description,
    status,
    priority,
    dueDate,
  });

  await task.save();

  return NextResponse.json(task);
}

export async function PUT(request: Request) {
  const token = await getToken({ req: request as any });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { _id, ...updateData } = await request.json();

  await connectToDatabase();

  const task = await Task.findOneAndUpdate(
    { _id, userId: token.id },
    updateData,
    { new: true }
  );

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  return NextResponse.json(task);
}

export async function DELETE(request: Request) {
  const token = await getToken({ req: request as any });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await request.json();

  await connectToDatabase();

  const result = await Task.deleteOne({ _id: id, userId: token.id });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Task deleted successfully' });
}