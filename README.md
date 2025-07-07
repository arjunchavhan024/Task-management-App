# Personal Task Tracker

A beautiful and intuitive personal task management application built with React and TypeScript. This application helps you stay organized and productive with a clean, modern interface.

## 🌟 Features

- **Simple Authentication**: Username-based login with localStorage persistence
- **Task Management**: Add, edit, delete, and toggle completion status of tasks
- **Task Organization**: Filter tasks by status (All, Completed, Pending)
- **Search Functionality**: Search tasks by title or description
- **Visual Status Indicators**: Clear visual distinction between completed and pending tasks
- **Creation Timestamps**: Track when tasks were created
- **Responsive Design**: Optimized for both mobile and desktop devices
- **Data Persistence**: Tasks are saved locally and persist between sessions
- **Confirmation Dialogs**: Prevent accidental deletions with confirmation prompts

## 🚀 Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lucide React** - Beautiful, customizable icons
- **Vite** - Fast build tool and development server
- **localStorage** - Client-side data persistence

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 📱 Usage

1. **Login**: Enter any username to access the task dashboard
2. **Add Task**: Fill in the task form with a title (required) and optional description
3. **Edit Task**: Click the edit icon on any task to modify it
4. **Toggle Complete**: Click the circle/check icon to mark tasks as complete/incomplete
5. **Delete Task**: Click the trash icon and confirm deletion
6. **Filter Tasks**: Use the filter buttons to view All, Completed, or Pending tasks
7. **Search**: Use the search bar to find specific tasks by title or description

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Login.tsx          # Login form component
│   ├── Header.tsx         # App header with user info and logout
│   ├── TaskForm.tsx       # Form for adding/editing tasks
│   ├── TaskItem.tsx       # Individual task display component
│   ├── TaskList.tsx       # List of tasks with empty states
│   └── TaskFilter.tsx     # Filter and search controls
├── utils/
│   └── localStorage.ts    # localStorage utility functions
├── App.tsx                # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles and Tailwind imports
```

## 🎨 Design Features

- **Modern UI**: Clean, card-based layout with subtle shadows and rounded corners
- **Color System**: Comprehensive color palette with blue primary, green success, and red warning colors
- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Smooth Animations**: Hover effects and transitions for better user experience
- **Accessibility**: Proper contrast ratios and keyboard navigation support
- **Loading States**: Visual feedback for better user experience

## 🔧 Development

- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Lint code**: `npm run lint`

## 📊 Features Implemented

- ✅ Simple login with username storage
- ✅ Add, edit, delete, and toggle tasks
- ✅ Task filtering (All, Completed, Pending)
- ✅ Search functionality
- ✅ Responsive design
- ✅ Data persistence with localStorage
- ✅ Creation timestamps
- ✅ Confirmation dialogs
- ✅ Visual status indicators
- ✅ Task counters
- ✅ Clean component architecture

## 🌐 Browser Support

This application works on all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is open source and available under the MIT License.