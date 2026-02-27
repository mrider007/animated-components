import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps, WithChildren, SizeProps } from '../../../types/common';

interface HeadingProps extends BaseProps, WithChildren, SizeProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading: React.FC<HeadingProps> = ({ children, className = '', as = 'h2', size = 'md', ...rest }) => {
  const Tag = as;

  const sizeClasses: Record<string, string> = {
    xs: 'text-lg md:text-xl',
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl',
    xl: 'text-4xl md:text-5xl',
    '2xl': 'text-5xl md:text-6xl',
    '3xl': 'text-6xl md:text-7xl',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Tag {...rest} className={`font-bold tracking-tight text-gray-900 ${sizeClasses[size] || sizeClasses.md} ${className}`}>
        {children}
      </Tag>
    </motion.div>
  );
};

