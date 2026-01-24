import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Search } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full bg-cosmos-card border border-cosmos-border rounded-lg px-4 py-2.5',
              'text-white placeholder-gray-500',
              'focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan',
              'transition-colors duration-200',
              leftIcon && 'pl-10',
              error && 'border-error focus:border-error focus:ring-error',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

// SearchInput variant
export function SearchInput({
  className,
  ...props
}: Omit<InputProps, 'leftIcon'>) {
  return (
    <Input
      type="search"
      leftIcon={<Search className="w-5 h-5" />}
      className={className}
      {...props}
    />
  );
}
