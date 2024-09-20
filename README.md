# Task Management Dashboard

A modern, feature-rich task management application built with Next.js, featuring a task list view and a Kanban board. This project showcases a full-stack implementation with user authentication, a backend API, and MongoDB integration, all styled with Shadcn UI components.

## Features

- **User Authentication**: Secure sign-up, login, and logout functionality using JWT.
- **Task Management**: Create, read, update, and delete tasks with ease.
- **Dual View Interface**:
  - Task List: A filterable and sortable list of all tasks.
  - Kanban Board: Visual task management with drag-and-drop functionality.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Real-time Updates**: State management ensures immediate UI updates.
- **Advanced Filtering**: Sort and filter tasks by status, priority, and due date.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **UI Framework**: Shadcn UI
- **State Management**: React Context API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Git

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/abhii08/task-management-dashboard-Next.js.git
   cd task-management-dashboard
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Endpoints

- `POST /api/auth/signup`: User registration
- `POST /api/auth/login`: User login
- `GET /api/tasks`: Fetch all tasks
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task

## Deployment

This project is deployed on Vercel. You can view the live version at: 

To deploy your own instance:

1. Push your code to a GitHub repository.
2. Connect your GitHub account to Vercel.
3. Import the project from your GitHub repository.
4. Configure the environment variables in the Vercel dashboard.
5. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.