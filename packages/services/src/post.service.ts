// Post Service - handles post-related operations
import { postsApi } from '@aaloo/api';
import type {
  Post,
  CreatePostData,
  UpdatePostData,
  PaginatedResponse,
} from '@aaloo/types';

export class PostService {
  // Get all posts with pagination
  static async getAll(params?: { page?: number; limit?: number }): Promise<{
    posts: PaginatedResponse<Post> | null;
    error: string | null;
  }> {
    const response = await postsApi.getAll(params);
    return {
      posts: response.data as PaginatedResponse<Post> | null,
      error: response.error,
    };
  }

  // Get post by ID
  static async getById(id: string): Promise<{
    post: Post | null;
    error: string | null;
  }> {
    const response = await postsApi.getById(id);
    return {
      post: response.data as Post | null,
      error: response.error,
    };
  }

  // Create new post
  static async create(data: CreatePostData): Promise<{
    post: Post | null;
    error: string | null;
  }> {
    const response = await postsApi.create(data);
    return {
      post: response.data as Post | null,
      error: response.error,
    };
  }

  // Update post
  static async update(
    id: string,
    data: UpdatePostData
  ): Promise<{ post: Post | null; error: string | null }> {
    const response = await postsApi.update(id, data);
    return {
      post: response.data as Post | null,
      error: response.error,
    };
  }

  // Delete post
  static async delete(id: string): Promise<{ error: string | null }> {
    const response = await postsApi.delete(id);
    return { error: response.error };
  }
}
