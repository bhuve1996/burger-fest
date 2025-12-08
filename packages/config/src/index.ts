// Centralized configuration export
export * from './types';
export * from './layouts';
export * from './routes';
export * from './icons';
export * from './labels';
export * from './app';

// Re-export commonly used items
export { Role } from './types';
export { layouts } from './layouts';
export { routes, getRoutesByRole, getRoutesByLayout, getRouteByPath } from './routes';
export { icons } from './icons';
export { labels, getLabel } from './labels';
export { appConfig, isDevelopment, isProduction, isTest } from './app';

