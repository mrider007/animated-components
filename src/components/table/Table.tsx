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
    primary: 'text-blue-600 border-blue-600 hover:bg-blue-100',
    secondary: 'text-gray-600 border-gray-600 hover:bg-gray-100',
    success: 'text-green-600 border-green-600 hover:bg-green-100',
    danger: 'text-red-600 border-red-600 hover:bg-red-100',
    warning: 'text-yellow-500 border-yellow-500 hover:bg-yellow-100',
    info: 'text-blue-400 border-blue-400 hover:bg-blue-50',
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
