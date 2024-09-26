'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useTaskManagement } from '@/hooks/useTaskManagement';
import TaskListPage from './task-list/page';
import KanbanBoardPage from './kanban-board/page';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { tasks, fetchTasks } = useTaskManagement();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      fetchTasks();
    }
  }, [status, router, fetchTasks]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    return null;
  }

  const todoCount = tasks.filter(task => task.status === 'To Do').length;
  const inProgressCount = tasks.filter(task => task.status === 'In Progress').length;
  const completedCount = tasks.filter(task => task.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to your Dashboard, {session?.user?.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title=''>
          <CardHeader>
            <CardTitle>To Do</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{todoCount}</p>
          </CardContent>
        </Card>
        <Card title=''>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{inProgressCount}</p>
          </CardContent>
        </Card>
        <Card title=''>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{completedCount}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/dashboard/task-list">
          <Button className="w-full h-32 text-xl" onClick={TaskListPage}>
            Task List
          </Button>
        </Link>
        <Link href="/dashboard/kanban-board">
          <Button className="w-full h-32 text-xl" onClick={KanbanBoardPage}>
            Kanban Board
          </Button>
        </Link>
      </div>
    </div>
  );
}