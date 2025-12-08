// Shared TypeScript types for Burger Fest

// User types
export type User = {
  id: string;
  email: string;
  name: string | null;
  role: 'user' | 'moderator' | 'admin';
  createdAt: Date;
  updatedAt: Date;
};

// Post types
export type Post = {
  id: string;
  userId: string;
  imageUrl: string;
  restaurant: string | null;
  rating: number | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
};

// API Response types
export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

// Auth types
export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  role: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignUpData = {
  email: string;
  password: string;
  name?: string;
};

// Post creation types
export type CreatePostData = {
  imageUrl: string;
  restaurant?: string;
  rating?: number;
  description?: string;
};

export type UpdatePostData = Partial<CreatePostData>;

// Pagination types
export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};
