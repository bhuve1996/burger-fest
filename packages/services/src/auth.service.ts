// Auth Service - handles authentication logic
import { createClient } from '@supabase/supabase-js';
import { appConfig } from '@burger-fest/config';
import type { AuthUser, LoginCredentials, SignUpData } from '@burger-fest/types';

const supabase = createClient(appConfig.supabaseUrl, appConfig.supabaseKey);

export class AuthService {
  // Email/Password Sign Up
  static async signUp(data: SignUpData) {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    });

    if (error) {
      return { user: null, error: error.message };
    }

    return {
      user: authData.user
        ? {
            id: authData.user.id,
            email: authData.user.email || '',
            name: authData.user.user_metadata?.name,
            role: authData.user.user_metadata?.role || 'user',
          }
        : null,
      error: null,
    };
  }

  // Email/Password Sign In
  static async signIn(credentials: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    return {
      user: data.user
        ? {
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.name,
            role: data.user.user_metadata?.role || 'user',
          }
        : null,
      error: null,
    };
  }

  // Google Social Login
  static async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    return { data, error };
  }

  // Sign Out
  static async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error: error?.message || null };
  }

  // Get Current User
  static async getCurrentUser(): Promise<AuthUser | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    return {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.name,
      role: user.user_metadata?.role || 'user',
    };
  }

  // Get Session
  static async getSession() {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error: error?.message || null };
  }
}

