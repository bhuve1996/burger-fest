// User Service - handles user-related operations
import { usersApi } from '@aaloo/api';
import type { User } from '@aaloo/types';

export class UserService {
  // Get current user profile
  static async getProfile(): Promise<{
    user: User | null;
    error: string | null;
  }> {
    const response = await usersApi.getProfile();
    return {
      user: response.data as User | null,
      error: response.error,
    };
  }

  // Update user profile
  static async updateProfile(
    data: Partial<Pick<User, 'name' | 'email'>>
  ): Promise<{ user: User | null; error: string | null }> {
    const response = await usersApi.updateProfile(data);
    return {
      user: response.data as User | null,
      error: response.error,
    };
  }
}
