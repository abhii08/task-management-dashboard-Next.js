import React, { useState } from 'react';
import { Task } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TaskForm } from './TaskForm';

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedTask: Omit<Task, '_id'>) => {
    onUpdate({ ...updatedTask, _id: task._id });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card title='Team Updates'>
        <CardContent>
          <TaskForm
            task={task}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        </CardContent>
      </Card>
    );
  }

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
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
          <Button onClick={() => onDelete(task._id)}>Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
};