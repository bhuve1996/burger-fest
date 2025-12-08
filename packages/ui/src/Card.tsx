// Cross-platform Card component (works on mobile + web)
import { View, type ViewProps } from 'react-native';
import type { ReactNode } from 'react';
import './nativewind.d';

export interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <View
      className={`
        bg-white rounded-lg shadow-md p-4
        ${className}
      `}
      {...props}
    >
      {children}
    </View>
  );
}
