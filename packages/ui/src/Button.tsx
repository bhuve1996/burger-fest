// Cross-platform Button component (works on mobile + web)
import { Pressable, Text, type PressableProps } from 'react-native';
import type { ReactNode } from 'react';
import './nativewind.d';

export interface ButtonProps extends Omit<PressableProps, 'className'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  primary: 'bg-blue-500 active:bg-blue-600',
  secondary: 'bg-gray-200 active:bg-gray-300',
  outline: 'border-2 border-blue-500 bg-transparent active:bg-blue-50',
  ghost: 'bg-transparent active:bg-gray-100',
};

const textVariantStyles = {
  primary: 'text-white',
  secondary: 'text-gray-900',
  outline: 'text-blue-500',
  ghost: 'text-gray-700',
};

const sizeStyles = {
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
};

const textSizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={`
        rounded-lg font-semibold items-center justify-center
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      <Text
        className={`
          font-semibold
          ${textVariantStyles[variant]}
          ${textSizeStyles[size]}
        `}
      >
        {children}
      </Text>
    </Pressable>
  );
}
