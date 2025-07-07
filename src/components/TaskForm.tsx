import React, { useState, useEffect } from 'react';
import { Plus, Edit3, X } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onUpdateTask?: (task: Task) => void;
  editingTask?: Task | null;
  onCancelEdit?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  onUpdateTask,
  editingTask,
  onCancelEdit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    if (editingTask && onUpdateTask) {
      onUpdateTask({
        ...editingTask,
        title: title.trim(),
        description: description.trim(),
      });
    } else {
      onAddTask({
        title: title.trim(),
        description: description.trim(),
        completed: false,
      });
    }

    setTitle('');
    setDescription('');
    setError('');
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setError('');
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        {editingTask ? (
          <Edit3 className="w-5 h-5 text-blue-500" />
        ) : (
          <Plus className="w-5 h-5 text-blue-500" />
        )}
        <h2 className="text-lg font-semibold text-gray-900">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            placeholder="Enter task title"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            {editingTask ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;