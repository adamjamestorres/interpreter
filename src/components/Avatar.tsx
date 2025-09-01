import { HTMLAttributes } from 'react';
import cn from 'classnames';
import Image from 'next/image';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
}

const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback,
  className,
  ...props
}: AvatarProps) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const getFallbackInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  if (!src) {
    return (
      <div
        className={cn(
          'rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600',
          sizes[size],
          className
        )}
        {...props}
      >
        {fallback ? getFallbackInitials(fallback) : '?'}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-full bg-gray-200 overflow-hidden',
        sizes[size],
        className
      )}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        width={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
        height={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
        className="h-full w-full rounded-full object-cover"
        />
    </div>
  );
};

export default Avatar;
