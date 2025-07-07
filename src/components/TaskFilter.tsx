import React from 'react';
import { Search, X } from 'lucide-react';

interface TaskFilterProps {
  activeFilter: 'all' | 'completed' | 'pending';
  onFilterChange: (filter: 'all' | 'completed' | 'pending') => void;
  allCount: number;
  completedCount: number;
  pendingCount: number;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  activeFilter,
  onFilterChange,
  allCount,
  completedCount,
  pendingCount,
  searchTerm,
  onSearchChange,
}) => {
  const filters = [
    { key: 'all' as const, label: 'All', count: allCount },
    { key: 'pending' as const, label: 'Pending', count: pendingCount },
    { key: 'completed' as const, label: 'Completed', count: completedCount },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full sm:w-auto">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeFilter === filter.key
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeFilter === filter.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;