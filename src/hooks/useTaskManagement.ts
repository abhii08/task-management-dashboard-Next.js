'use client'

import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/types';

export const useTaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, []);

  const addTask = useCallback(async (task: Omit<Task, '_id'>) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }, []);

  const updateTask = useCallback(async (updatedTask: Task) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      if (response.ok) {
        const updatedTaskData = await response.json();
        setTasks(tasks.map((task) => (task._id === updatedTaskData._id ? updatedTaskData : task)));
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }, []);
  
  const deleteTask = useCallback(async (taskId: string) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId }),
      });
      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }, []);

  return { tasks, addTask, updateTask, deleteTask };
};