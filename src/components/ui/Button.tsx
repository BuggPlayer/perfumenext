import React from 'react';
import { cn } from '@/lib/utils';
import LoadingSpinner from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-500 text-black hover:bg-primary-600 focus:ring-primary-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl',
  } as const;
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  const disabledClassesByVariant: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-faded)] hover:shadow-none hover:bg-[var(--bg-surface)]',
    secondary: 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-faded)] hover:shadow-none',
    outline: 'border border-[var(--border-faded)] text-[var(--text-muted)] hover:bg-transparent',
    ghost: 'text-[var(--text-muted)] hover:bg-transparent',
    danger: 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-faded)] hover:shadow-none',
  };

  return (
    <button
      className={cn(
        baseClasses,
        disabled ? disabledClassesByVariant[variant] : variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" color="white" className="mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

