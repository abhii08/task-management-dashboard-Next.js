'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TaskList } from '@/components/TaskList';
import { TaskForm } from '@/components/TaskForm';
import { useTaskManagement } from '@/hooks/useTaskManagement';

export default function TaskListPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { tasks, addTask, updateTask, deleteTask } = useTaskManagement();
  const [isFormOpen, setIsFormOpen] = useState(false);

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
      <h1 className="text-3xl font-bold mb-8">Task List</h1>
      <button 
        onClick={() => setIsFormOpen(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add New Task
      </button>
      <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
      {isFormOpen && (
        <TaskForm
          onSubmit={(task) => {
            addTask(task);
            setIsFormOpen(false);
          }}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}