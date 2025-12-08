import { RouteConfig, Role } from './types';

export const routes: RouteConfig[] = [
  // Mobile/Web Routes
  {
    path: '/feed',
    component: 'Feed',
    roles: [Role.USER, Role.ADMIN],
    layout: 'mobile',
    protected: true,
    title: 'Burger Feed',
    icon: 'home',
  },
  {
    path: '/log',
    component: 'MealLog',
    roles: [Role.USER, Role.ADMIN],
    layout: 'mobile',
    protected: true,
    title: 'Log Meal',
    icon: 'add-circle',
  },
  {
    path: '/leaderboard',
    component: 'Leaderboard',
    roles: [Role.USER, Role.ADMIN],
    layout: 'mobile',
    protected: true,
    title: 'Leaderboard',
    icon: 'trophy',
  },
  {
    path: '/insights',
    component: 'Insights',
    roles: [Role.USER, Role.ADMIN],
    layout: 'mobile',
    protected: true,
    title: 'Insights',
    icon: 'analytics',
  },
  {
    path: '/profile',
    component: 'Profile',
    roles: [Role.USER, Role.ADMIN],
    layout: 'mobile',
    protected: true,
    title: 'Profile',
    icon: 'person',
  },
  // Auth Routes
  {
    path: '/login',
    component: 'Login',
    roles: [],
    layout: 'mobile',
    protected: false,
    title: 'Login',
  },
  {
    path: '/signup',
    component: 'SignUp',
    roles: [],
    layout: 'mobile',
    protected: false,
    title: 'Sign Up',
  },
  // Admin Routes
  {
    path: '/admin',
    component: 'AdminDashboard',
    roles: [Role.ADMIN],
    layout: 'admin',
    protected: true,
    title: 'Admin Dashboard',
    icon: 'dashboard',
  },
  {
    path: '/admin/users',
    component: 'UserManagement',
    roles: [Role.ADMIN],
    layout: 'admin',
    protected: true,
    title: 'User Management',
    icon: 'people',
  },
  {
    path: '/admin/posts',
    component: 'PostModeration',
    roles: [Role.ADMIN, Role.MODERATOR],
    layout: 'admin',
    protected: true,
    title: 'Post Moderation',
    icon: 'list',
  },
  {
    path: '/admin/analytics',
    component: 'Analytics',
    roles: [Role.ADMIN],
    layout: 'admin',
    protected: true,
    title: 'Analytics',
    icon: 'bar-chart',
  },
];

// Helper functions
export const getRoutesByRole = (role: Role): RouteConfig[] => {
  return routes.filter((route) => route.roles.includes(role) || route.roles.length === 0);
};

export const getRoutesByLayout = (layout: string): RouteConfig[] => {
  return routes.filter((route) => route.layout === layout);
};

export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find((route) => route.path === path);
};

