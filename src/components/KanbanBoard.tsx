import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Task } from '@/types';
import { TaskCard } from './TaskCard';

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onUpdateTask }) => {
  const columns = ['To Do', 'In Progress', 'Completed'];

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const task = tasks.find((t) => t._id === result.draggableId);

    if (task && source.droppableId !== destination.droppableId) {
      const updatedTask = { ...task, status: destination.droppableId };
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
                              task={task}
                              onUpdate={onUpdateTask}
                              onDelete={() => {}}
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