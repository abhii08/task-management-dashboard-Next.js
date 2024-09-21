import React, { useState } from 'react';
import { Task } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Omit<Task, '_id'>) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<'To Do' | 'In Progress' | 'Completed'>(task?.status || 'To Do');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>(task?.priority || 'Medium');
  const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    });
  };

  const statusOptions: { key: 'To Do' | 'In Progress' | 'Completed'; value: string }[] = [
    { key: 'To Do', value: 'To Do' },
    { key: 'In Progress', value: 'In Progress' },
    { key: 'Completed', value: 'Completed' }
  ];

  const priorityOptions: { key: 'Low' | 'Medium' | 'High'; value: string }[] = [
    { key: 'Low', value: 'Low' },
    { key: 'Medium', value: 'Medium' },
    { key: 'High', value: 'High' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e)}
        placeholder="Title"
        required
      />
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e)}
        placeholder="Description" 
      />
      <Select<'To Do' | 'In Progress' | 'Completed'>
        options={statusOptions}
        onSelect={(value) => setStatus(value)}
        required
      />
      <Select<'Low' | 'Medium' | 'High'>
        options={priorityOptions}
        onSelect={(value) => setPriority(value)}
        required
      />
      <Input
        type="date"
        value={dueDate}
        placeholder="Due date"
        onChange={(e) => setDueDate(e)}
      />
      <div className="space-x-2">
        <Button type='submit' onClick={handleSubmit}>Submit</Button>
        <Button type='button' onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};
