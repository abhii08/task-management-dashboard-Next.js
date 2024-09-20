import { Task } from '@/types';

export function sortTasks(tasks: Task[], sortBy: 'dueDate' | 'priority' | 'status'): Task[] {
  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        return new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime();
      case 'priority':
        const priorityOrder = { 'Low': 0, 'Medium': 1, 'High': 2 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'status':
        const statusOrder = { 'To Do': 0, 'In Progress': 1, 'Completed': 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      default:
        return 0;
    }
  });
}

export function filterTasks(tasks: Task[], filters: Partial<Task>): Task[] {
  return tasks.filter(task => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined) return true;
      return task[key as keyof Task] === value;
    });
  });
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getColorForPriority(priority: Task['priority']): string {
  switch (priority) {
    case 'Low':
      return 'bg-green-500';
    case 'Medium':
      return 'bg-yellow-500';
    case 'High':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}