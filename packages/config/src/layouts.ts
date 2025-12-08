import { LayoutConfig, LayoutType } from './types';

export const layouts: Record<LayoutType, LayoutConfig> = {
  mobile: {
    header: {
      height: 60,
      sticky: true,
    },
    navigation: {
      type: 'bottom-tabs',
      visible: true,
    },
  },
  admin: {
    header: {
      height: 64,
      sticky: true,
    },
    sidebar: {
      width: 250,
      collapsible: true,
    },
    navigation: {
      type: 'sidebar',
      visible: true,
    },
  },
  web: {
    header: {
      height: 70,
      sticky: true,
    },
    navigation: {
      type: 'top-nav',
      visible: true,
    },
  },
};

