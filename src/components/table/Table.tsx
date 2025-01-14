'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants'; 
import { BaseProps, WithChildren, SizeProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface TableProps extends BaseProps, WithChildren, SizeProps {
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
  color?: Color;
}

export const Table: React.FC<TableProps> = ({
  children,
  className = '',
  motionVariant = 'fadeIn', // Default motion variant
  color = 'primary', // Color customization
}) => {
  const baseClasses = 'overflow-x-auto';

  const colorClasses = {
    primary: 'border-blue-600 text-blue-600',
    secondary: 'border-gray-600 text-gray-600',
    success: 'border-green-600 text-green-600',
    danger: 'border-red-600 text-red-600',
    warning: 'border-yellow-500 text-yellow-500',
    info: 'border-blue-400 text-blue-400',
  };

  return (
    <motion.div
      className={`${baseClasses} ${colorClasses[color]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      variants={motionVariants[motionVariant]}
    >
      <table className="min-w-full divide-y divide-gray-200">
        {children}
      </table>
    </motion.div>
  );
};
