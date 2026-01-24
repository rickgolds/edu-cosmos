import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cosmos-dark disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-accent-cyan text-cosmos-darker hover:bg-accent-cyan/90 hover:shadow-glow-sm focus-visible:ring-accent-cyan',
      secondary:
        'bg-cosmos-card border border-cosmos-border text-white hover:bg-cosmos-border hover:border-accent-cyan/50 focus-visible:ring-accent-cyan',
      ghost:
        'bg-transparent text-gray-300 hover:bg-white/5 hover:text-white focus-visible:ring-accent-cyan',
      danger:
        'bg-error/20 text-error border border-error/30 hover:bg-error/30 focus-visible:ring-error',
    };

    const sizes = {
      sm: 'text-sm px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-6 py-3 gap-2',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
