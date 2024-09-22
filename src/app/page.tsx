"use client"
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import KanbanBoardPage from './dashboard/kanban-board/page';
import Login from './auth/login/page';
import Register from './auth/register/page';

export default function Home() {
  const { status } = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Task Management Dashboard</h1>
        {status === 'authenticated' ? (
          <Link href="/dashboard">
            <Button onClick={KanbanBoardPage}>Go to Dashboard</Button>
          </Link>
        ) : (
          <div>
            <Link href="/auth/login" className="mr-4">
              <Button onClick={Login} >Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button onClick={Register}>Register</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}