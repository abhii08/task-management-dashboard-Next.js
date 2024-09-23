import React, { useRef } from 'react';
import { DndProvider, useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Task } from '@/types';
import { TaskCard } from './TaskCard';

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const ItemTypes = {
  TASK: 'task',
};

const TaskItem: React.FC<{ task: Task; index: number; onUpdateTask: (task: Task) => void; onDeleteTask: (taskId: string) => void }> = ({ task, index, onUpdateTask, onDeleteTask }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <TaskCard
        key={task._id}
        task={task}
        onUpdate={onUpdateTask}
        onDelete={onDeleteTask}
      />
    </div>
  );
};

const Column: React.FC<{ status: Task['status']; tasks: Task[]; onUpdateTask: (task: Task) => void; onDeleteTask: (taskId: string) => void }> = ({
  status,
  tasks,
  onUpdateTask,
  onDeleteTask,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: { id: string; status: Task['status'] }, monitor: DropTargetMonitor) => {
      if (item.status !== status) {
        const task = tasks.find((t) => t._id === item.id);
        if (task) {
          onUpdateTask({ ...task, status });
        }
      }
    },
  });

  drop(ref);

  return (
    <div ref={ref} className="bg-gray-200 p-4 rounded-lg w-1/3">
      <h2 className="text-xl font-bold mb-4">{status}</h2>
      <div className="space-y-4">
        {tasks
          .filter((task) => task.status === status)
          .map((task, index) => (
            <TaskItem 
              key={task._id} 
              task={task} 
              index={index} 
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
      </div>
    </div>
  );
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const columns: Array<Task['status']> = ['To Do', 'In Progress', 'Completed'];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex space-x-4">
        {columns.map((column) => (
          <Column
            key={column}
            status={column}
            tasks={tasks}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};