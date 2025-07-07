import React from 'react';
import TaskItem from './TaskItem';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (task: Task) => void;
  filter: 'all' | 'completed' | 'pending';
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  filter,
}) => {
  const getEmptyStateMessage = () => {
    switch (filter) {
      case 'completed':
        return {
          icon: <CheckCircle className="w-12 h-12 text-green-400" />,
          title: 'No completed tasks',
          description: 'Complete some tasks to see them here',
        };
      case 'pending':
        return {
          icon: <Circle className="w-12 h-12 text-blue-400" />,
          title: 'No pending tasks',
          description: 'Great job! You have no pending tasks',
        };
      default:
        return {
          icon: <AlertCircle className="w-12 h-12 text-gray-400" />,
          title: 'No tasks yet',
          description: 'Add your first task to get started',
        };
    }
  };

  if (tasks.length === 0) {
    const emptyState = getEmptyStateMessage();
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          {emptyState.icon}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {emptyState.title}
        </h3>
        <p className="text-gray-600">
          {emptyState.description}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;