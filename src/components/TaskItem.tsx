import React, { useState } from 'react';
import { Edit3, Trash2, Check, Circle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDeleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className={`bg-white p-4 rounded-xl shadow-md border-l-4 transition-all duration-200 hover:shadow-lg ${
      task.completed ? 'border-green-400 bg-green-50' : 'border-blue-400'
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`mt-1 p-1 rounded-full transition-colors ${
            task.completed
              ? 'text-green-600 hover:bg-green-100'
              : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
          }`}
        >
          {task.completed ? (
            <Check className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`font-medium ${
            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm mt-1 ${
              task.completed ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            Created: {formatDate(task.createdAt)}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEditTask(task)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit task"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700 mb-3">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleConfirmDelete}
              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={handleCancelDelete}
              className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;