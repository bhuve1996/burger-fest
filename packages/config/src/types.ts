export enum Role {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
}

export type LayoutType = 'mobile' | 'admin' | 'web';

export interface LayoutConfig {
  header: {
    height: number;
    sticky: boolean;
  };
  navigation?: {
    type: 'bottom-tabs' | 'sidebar' | 'top-nav';
    visible: boolean;
  };
  sidebar?: {
    width: number;
    collapsible: boolean;
  };
}

export interface RouteConfig {
  path: string;
  component: string;
  roles: Role[];
  layout: LayoutType;
  protected: boolean;
  title?: string;
  icon?: string;
}

export interface IconConfig {
  web: string;
  mobile: string;
}

export interface LabelConfig {
  [key: string]: string;
}

export interface AppConfig {
  name: string;
  version: string;
  apiUrl: string;
  supabaseUrl: string;
  supabaseKey: string;
  features: {
    [key: string]: boolean;
  };
}

