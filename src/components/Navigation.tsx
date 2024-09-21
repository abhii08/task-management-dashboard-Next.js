'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button';

export function Navigation() {
  const { data: session, status } = useSession();
  
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Task Dashboard
        </Link>
        <div>
          {status === 'authenticated' ? (
            <>
              <Link href="/dashboard" className="mr-4">
                Dashboard
              </Link>
              <Link href="/dashboard/task-list" className="mr-4">
                Task List
              </Link>
              <Link href="/dashboard/kanban-board" className="mr-4">
                Kanban Board
              </Link>
              <Button onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="mr-4">
                Login
              </Link>
              <Link href="/auth/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}