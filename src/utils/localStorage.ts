interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

const STORAGE_KEYS = {
  TASKS: 'task-tracker-tasks',
  USERNAME: 'task-tracker-username',
} as const;

export const storageUtils = {
  // Task management
  getTasks: (): Task[] => {
    try {
      const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  },

  saveTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  },

  // User management
  getUsername: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.USERNAME);
    } catch (error) {
      console.error('Error loading username from localStorage:', error);
      return null;
    }
  },

  saveUsername: (username: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERNAME, username);
    } catch (error) {
      console.error('Error saving username to localStorage:', error);
    }
  },

  clearUsername: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USERNAME);
    } catch (error) {
      console.error('Error clearing username from localStorage:', error);
    }
  },

  // Utility functions
  clearAllData: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.TASKS);
      localStorage.removeItem(STORAGE_KEYS.USERNAME);
    } catch (error) {
      console.error('Error clearing all data from localStorage:', error);
    }
  },
};