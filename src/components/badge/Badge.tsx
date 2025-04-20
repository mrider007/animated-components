'use client';

import React from 'react';
import { motion,HTMLMotionProps } from 'framer-motion';
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
  ...rest
}) => {
  // Define the colors
  const colorStyles: { [key: string]: string } = {
    primary: '#E0F7FA',  // bg-blue-100
    secondary: '#F1F1F1',  // bg-gray-100
    success: '#E8F5E9',  // bg-green-100
    danger: '#FFEBEE',  // bg-red-100
    warning: '#FFFDE7',  // bg-yellow-100
    info: '#E8EAF6',  // bg-indigo-100
  };

  const textColor: { [key: string]: string } = {
    primary: '#00796B',  // text-blue-800
    secondary: '#757575',  // text-gray-800
    success: '#388E3C',  // text-green-800
    danger: '#C62828',  // text-red-800
    warning: '#FBC02D',  // text-yellow-800
    info: '#1976D2',  // text-indigo-800
  };

  // Define the sizes
  const sizeStyles: { [key: string]: { padding: string; fontSize: string } } = {
    xs: { padding: '0.125rem 0.5rem', fontSize: '0.75rem' },
    sm: { padding: '0.25rem 0.75rem', fontSize: '0.875rem' },
    md: { padding: '0.375rem 1rem', fontSize: '1rem' },
    lg: { padding: '0.5rem 1.25rem', fontSize: '1.125rem' },
    xl: { padding: '0.625rem 1.5rem', fontSize: '1.25rem' },
  };

  // Generate custom styles dynamically
  const customStyle = {
    backgroundColor: colorStyles[color] || colorStyles.primary,
    color: textColor[color] || textColor.primary,
    padding: sizeStyles[size].padding,
    fontSize: sizeStyles[size].fontSize,
  };

  return (
    <motion.span
      className={`inline-flex items-center font-medium rounded-full ${className}`}
      style={customStyle} // Apply dynamic inline styles here
      variants={motionVariants[motionVariant]} // Apply motion variant here
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3 }}
      {...rest}
    >
      {children}
    </motion.span>
  );
};
