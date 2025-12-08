// Cross-platform Input component (works on mobile + web)
import { TextInput, type TextInputProps } from 'react-native';
import { forwardRef, type Ref } from 'react';
import './nativewind.d';

export interface InputProps extends TextInputProps {
  variant?: 'default' | 'outline';
  className?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ variant = 'default', className = '', ...props }, ref: Ref<TextInput>) => {
    const variantStyles =
      variant === 'outline'
        ? 'border-2 border-gray-300'
        : 'border-b border-gray-300';

    return (
      <TextInput
        ref={ref}
        className={`
          px-4 py-2 rounded-lg bg-white
          ${variantStyles}
          ${className}
        `}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
