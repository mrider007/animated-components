import React from 'react';
import { BaseProps, SizeProps, RadiusProps, Radius } from '../../../types/common';
import { HTMLMotionProps, motion } from 'framer-motion';

export interface AvatarProps extends BaseProps, SizeProps, RadiusProps, Omit<HTMLMotionProps<'div'>, 'children'> {
  src?: string;
  alt?: string;
  initials?: string;
  fallbackIcon?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({
  className = '',
  size = 'md',
  radius = 'full',
  src,
  alt,
  initials,
  fallbackIcon,
  ...rest
}) => {
  const sizeClasses: Record<string, string> = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm md:w-11 md:h-11 md:text-base',
    lg: 'w-12 h-12 text-base md:w-14 md:h-14 md:text-lg',
    xl: 'w-14 h-14 text-lg md:w-16 md:h-16 md:text-xl',
    '2xl': 'w-16 h-16 text-xl md:w-20 md:h-20 md:text-2xl',
    full: 'w-full h-full text-base',
  };

  const getRadiusClasses = () => {
    switch (radius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case 'xl': return 'rounded-xl';
      case '2xl': return 'rounded-2xl';
      case 'full': return 'rounded-full';
      default: return `rounded-${radius}`;
    }
  };

  return (
    <motion.div
      {...rest}
      className={`relative inline-flex items-center justify-center font-medium ${sizeClasses[size] || sizeClasses.md} ${getRadiusClasses()} bg-gray-100 text-gray-600 border border-gray-200/50 shadow-sm overflow-hidden flex-shrink-0 ${className}`}
    >
      {src ? (
        <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
      ) : initials ? (
        <span>{initials}</span>
      ) : fallbackIcon ? (
        fallbackIcon
      ) : (
        <svg className="w-3/5 h-3/5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </motion.div>
  );
};

