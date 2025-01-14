import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps, WithChildren, SizeProps } from '../../../types/common';

interface HeadingProps extends BaseProps, WithChildren, SizeProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading: React.FC<HeadingProps> = ({ children, className = '', as = 'h2', size = 'md' }) => {
  const Tag = as;
  const sizeClasses = {
    xs: 'text-lg',
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Tag className={`font-bold ${sizeClasses[size]} ${className}`}>
        {children}
      </Tag>
    </motion.div>
  );
};

