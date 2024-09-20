'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { KanbanBoard } from '@/components/KanbanBoard';
import { useTaskManagement } from '@/hooks/useTaskManagement';

export default function KanbanBoardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { tasks, updateTask, deleteTask } = useTaskManagement();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Kanban Board</h1>
      <KanbanBoard tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask}/>
    </div>
  );
}