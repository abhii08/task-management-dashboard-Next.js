'use client'

import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/types';
import { useSession } from 'next-auth/react';

export const useTaskManagement = () => {

  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = useCallback(async () => {
    if (!session) return;

    try {
      const response = await fetch('/api/tasks', {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [session]);

  useEffect(() => {
    if(session) {
      fetchTasks();
    }
    
  }, [session, fetchTasks]);

  const addTask = useCallback(async (task: Omit<Task, '_id'>) => {
    if (!session) return;

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
        credentials: 'include',
      });
      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
        await fetchTasks();
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }, [session]);

  const updateTask = useCallback(async (updatedTask: Task) => {
    if (!session) return;

    try {
      const response = await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
        credentials: 'include',
      });
      if (response.ok) {
        const updatedTaskData = await response.json();
        setTasks(tasks.map((task) => (task._id === updatedTaskData._id ? updatedTaskData : task)));
        await fetchTasks();
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }, [session]);
  
  const deleteTask = useCallback(async (taskId: string) => {
    if (!session) return;

    try {
      const response = await fetch('/api/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId }),
        credentials: 'include'
      });
      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskId));
        await fetchTasks();
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }, [session]);

  return { tasks, addTask, updateTask, deleteTask, fetchTasks };
};