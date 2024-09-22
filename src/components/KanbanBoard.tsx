import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Task } from '@/types';
import { TaskCard } from './TaskCard';

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const columns:Array<Task['status']> = ['To Do', 'In Progress', 'Completed'];

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const task = tasks.find((t) => t._id === result.draggableId);

    if (task && source.droppableId !== destination.droppableId) {
      const newStatus = destination.droppableId as Task['status'];
      const updatedTask: Task = { ...task, status: newStatus };
      onUpdateTask(updatedTask);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {columns.map((column) => (
          <div key={column} className="bg-gray-200 p-4 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">{column}</h2>
            <Droppable droppableId={column}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {tasks
                    .filter((task) => task.status === column)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              key={task._id}
                              task={task}
                              onUpdate={onUpdateTask}
                              onDelete={onDeleteTask}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};