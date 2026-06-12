# Your To-Dos

A comprehensive, feature-rich learning project built with modern web technologies. A full-stack application combining task management, time tracking, weather information, and community features.

## About This Project

This is an **educational project** designed to learn and practice:

- Building scalable React applications with TypeScript
- State management with Redux Toolkit
- Authentication and real-time database integration with Firebase
- Advanced UI patterns
- Modern tooling and development workflows
- API integration and data fetching
- Responsive web design with Tailwind CSS

## Features

### Task Management

- Create, read, update, and delete tasks with rich features
- Drag-and-drop interface for organizing tasks
- Search functionality to quickly find tasks
- Task categorization and filtering

### Time Tracking Tools

- **Timer**: Create countdowns with customizable time settings
- **Stopwatch**: Track elapsed time with lap functionality
- Multiple timers running simultaneously

### Weather Information

- Real-time weather data display
- Weather forecasts and detailed information
- Location-based weather queries
- Integration with external weather APIs

### Community Features

- Real-time chat functionality
- Community engagement and messaging
- Collaborative space for users

### User Management

- Firebase authentication
- User profiles and settings
- Secure login and signup
- Password recovery functionality

### UI/UX Enhancements

- Toast notifications for user feedback
- Tooltips and interactive help
- Loading spinners and progress indicators
- Smooth animations and transitions
- Mobile-responsive design

## Technology Stack

### Frontend Framework

- **React 18**
- **TypeScript**
- **Vite**
- **React Router DOM**

### State Management

- **Redux Toolkit** - Predictable state management
- **React Redux** - React bindings for Redux
- **TanStack React Query** - Server state management

### Styling

- **Tailwind CSS**
- **PostCSS**
- **CSS Modules**

### Backend & Authentication

- **Firebase**
- **Firebase Admin SDK**

### UI Components & Libraries

- **React Beautiful DND** - Drag-and-drop functionality
- **React Transition Group** - Animation transitions
- **React Tooltip** - Tooltip components
- **React Toastify** - Toast notifications
- **React Loader Spinner** - Loading indicators

### Development & Testing

- **Vitest** - Unit testing framework
- **Storybook** - Component development and documentation
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Stylelint** - CSS linting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Todos
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with your Firebase configuration:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Running the Application

**Development server:**

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

**Production build:**

```bash
npm run build
```

**Start production build:**

```bash
npm start
```

## Testing & Development

**Run tests:**

```bash
npm run test
```

**Storybook (component library):**

```bash
npm run storybook
```

**Code formatting:**

```bash
npm run prettier:fix
```

**Linting:**

```bash
npm run lint:fix
npm run stylelint:fix
```

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── store/            # Redux store configuration
├── hooks/            # Custom React hooks
├── api/              # API integration
├── config/           # Configuration files
├── helpers/          # Utility functions
├── types/            # TypeScript type definitions
├── assets/           # Images and static files
└── utils/            # Utility functions
```

## 🚀 Key Learning Outcomes

This project demonstrates:

- ✅ Component composition and reusability
- ✅ State management patterns with Redux
- ✅ Real-time data synchronization with Firebase
- ✅ Responsive design principles
- ✅ TypeScript best practices
- ✅ API integration patterns

---
