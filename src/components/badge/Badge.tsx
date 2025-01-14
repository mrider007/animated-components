'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps, WithChildren, ColorProps, SizeProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants'; // Import motion variants

interface BadgeProps extends BaseProps, WithChildren, ColorProps, SizeProps {
  motionVariant?: keyof typeof motionVariants; // Allow motion variant selection
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  color = 'primary',
  size = 'md',
  motionVariant = 'fadeIn', // Default motion variant
}) => {
  const colorClasses = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-indigo-100 text-indigo-800',
  };

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-sm',
    md: 'px-3 py-1 text-sm',
    lg: 'px-3.5 py-1.5 text-base',
    xl: 'px-4 py-2 text-lg',
  };

  return (
    <motion.span
      className={`inline-flex items-center font-medium rounded-full ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
      variants={motionVariants[motionVariant]} // Apply motion variant here
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.span>
  );
};
