export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Task {
  _id: string;
  userId?: string;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TaskWithoutId = Omit<Task, '_id'>;

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  totalCount: number;
  page: number;
  pageSize: number;
}