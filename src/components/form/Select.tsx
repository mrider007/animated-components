import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants'; 
import { BaseProps, SizeProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface SelectProps extends BaseProps, SizeProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  color?: Color;
  motionVariant?: keyof typeof motionVariants;
  
}

export const Select: React.FC<SelectProps> = ({
  className = '',
  size = 'md',
  options,
  value,
  onChange,
  color = 'primary',
  motionVariant = 'fadeIn', // Default motion variant
  ...rest
}) => {
  const baseClasses = 'w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';

  const colorClasses = {
    primary: 'border-blue-600 focus:ring-blue-500 text-blue-600',
    secondary: 'border-gray-600 focus:ring-gray-500 text-gray-600',
    success: 'border-green-600 focus:ring-green-500 text-green-600',
    danger: 'border-red-600 focus:ring-red-500 text-red-600',
    warning: 'border-yellow-500 focus:ring-yellow-400 text-yellow-500',
    info: 'border-blue-400 focus:ring-blue-300 text-blue-400',
  };

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
    xl: 'px-5 py-4 text-xl',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      variants={motionVariants[motionVariant]} // Using motion variant from utils
      transition={{ duration: 0.3 }}
    >
      <select
        className={`${baseClasses} ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
        value={value}
        onChange={onChange}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </motion.div>
  );
};
