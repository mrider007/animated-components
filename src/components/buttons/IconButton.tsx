import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants'; // Reusable motion variants
import { BaseProps, SizeProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';


interface IconButtonProps extends BaseProps, SizeProps {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'solid' | 'outline' | 'ghost';
  color?: Color;
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
}

export const IconButton: React.FC<IconButtonProps> = ({
  className = '',
  color = 'primary',
  size = 'md',
  icon,
  onClick,
  disabled = false,
  variant = 'solid',
  motionVariant = 'fadeIn', // Default motion variant
}) => {
  const baseClasses = 'rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2';

  const colorClasses = {
    primary: {
      solid: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    },
    secondary: {
      solid: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      outline: 'border border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
    },
    success: {
      solid: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      outline: 'border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
      ghost: 'text-green-600 hover:bg-green-50 focus:ring-green-500',
    },
    danger: {
      solid: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      outline: 'border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
      ghost: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
    },
    warning: {
      solid: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400',
      outline: 'border border-yellow-500 text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-400',
      ghost: 'text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-400',
    },
    info: {
      solid: 'bg-blue-400 text-white hover:bg-blue-500 focus:ring-blue-300',
      outline: 'border border-blue-400 text-blue-400 hover:bg-blue-50 focus:ring-blue-300',
      ghost: 'text-blue-400 hover:bg-blue-50 focus:ring-blue-300',
    },
  };


  const sizeClasses = {
    xs: 'p-1',
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
    xl: 'p-3',
  };

  return (
    <motion.button
      className={`${baseClasses} ${colorClasses[color][variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.button>
  );
};
