import { InputHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, className, fullWidth, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            'rounded-md border border-gray-300 px-3 py-2 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'placeholder:text-gray-400',
            error && 'border-red-500 focus:ring-red-500',
            fullWidth && 'w-full',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
