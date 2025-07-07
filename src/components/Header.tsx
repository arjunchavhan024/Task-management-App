import React from 'react';
import { LogOut, User, CheckSquare } from 'lucide-react';

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Task Tracker</h1>
              <p className="text-sm text-gray-600">Stay organized, stay productive</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-4 h-4" />
              <span className="font-medium">{username}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;