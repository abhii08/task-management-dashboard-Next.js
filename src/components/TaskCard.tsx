import React from 'react';
import { Task } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  
  return (
    <Card title='Team Updates'>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <p>Priority: {task.priority}</p>
        <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</p>
        <div className="mt-4 space-x-2">
          <Button onClick={() => onUpdate(task)}>Edit</Button>
          <Button onClick={() => onDelete(task._id)}>Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
};