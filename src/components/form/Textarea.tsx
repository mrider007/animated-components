import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants'; 
import { BaseProps, SizeProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface TextareaProps extends BaseProps, SizeProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  color?: Color;
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
}

export const Textarea: React.FC<TextareaProps> = ({
  className = '',
  size = 'md',
  placeholder,
  value,
  onChange,
  rows = 4,
  color = 'primary',
  motionVariant = 'fadeIn', // Default motion variant
  ...rest
}) => {
  const baseClasses = 'w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

  const colorClasses = {
    primary: 'focus:ring-blue-500 focus:border-blue-500',
    secondary: 'focus:ring-gray-500 focus:border-gray-500',
    success: 'focus:ring-green-500 focus:border-green-500',
    danger: 'focus:ring-red-500 focus:border-red-500',
    warning: 'focus:ring-yellow-400 focus:border-yellow-400',
    info: 'focus:ring-blue-300 focus:border-blue-300',
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
      variants={motionVariants[motionVariant]} // Apply motion variant
      transition={{ duration: 0.3 }}
    >
      <textarea
        className={`${baseClasses} ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        {...rest}
      />
    </motion.div>
  );
};
