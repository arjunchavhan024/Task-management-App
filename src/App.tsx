import React, { useState, useEffect, useMemo } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import { storageUtils } from './utils/localStorage';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

type FilterType = 'all' | 'completed' | 'pending';

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize app data
  useEffect(() => {
    const savedUsername = storageUtils.getUsername();
    const savedTasks = storageUtils.getTasks();
    
    setUsername(savedUsername);
    setTasks(savedTasks);
    setIsLoading(false);
  }, []);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    switch (activeFilter) {
      case 'completed':
        return filtered.filter(task => task.completed);
      case 'pending':
        return filtered.filter(task => !task.completed);
      default:
        return filtered;
    }
  }, [tasks, activeFilter, searchTerm]);

  // Task counts
  const taskCounts = useMemo(() => {
    const all = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.filter(task => !task.completed).length;
    return { all, completed, pending };
  }, [tasks]);

  const handleLogin = (userUsername: string) => {
    setUsername(userUsername);
    storageUtils.saveUsername(userUsername);
  };

  const handleLogout = () => {
    setUsername(null);
    storageUtils.clearUsername();
    setEditingTask(null);
    setActiveFilter('all');
    setSearchTerm('');
  };

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      completed: newTask.completed,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    storageUtils.saveTasks(updatedTasks);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    storageUtils.saveTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleToggleComplete = (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    storageUtils.saveTasks(updatedTasks);
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    storageUtils.saveTasks(updatedTasks);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Login screen
  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  // Main app
  return (
    <div className="min-h-screen bg-gray-50">
      <Header username={username} onLogout={handleLogout} />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <TaskForm
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            editingTask={editingTask}
            onCancelEdit={handleCancelEdit}
          />

          <TaskFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            allCount={taskCounts.all}
            completedCount={taskCounts.completed}
            pendingCount={taskCounts.pending}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            filter={activeFilter}
          />
        </div>
      </main>
    </div>
  );
}

export default App;