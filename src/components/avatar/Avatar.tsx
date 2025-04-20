import React from 'react';
import { BaseProps, SizeProps } from '../../../types/common';
import { HTMLMotionProps,motion } from 'framer-motion';

interface AvatarProps extends BaseProps, SizeProps,HTMLMotionProps<'div'> {
  src?: string;
  alt?: string;
  initials?: string;
  
}

export const Avatar: React.FC<AvatarProps> = ({ className = '', size = 'md', src, alt, initials,...rest }) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-14 h-14 text-xl',
  };

  return (
    <motion.div {...rest} className={`relative inline-flex items-center justify-center ${sizeClasses[size]} ${className} rounded-full bg-gray-200 overflow-hidden`}>
      {src ? (
      <img  src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <span className="font-medium text-gray-600">{initials}</span>
      )}
    </motion.div>
  );
};

