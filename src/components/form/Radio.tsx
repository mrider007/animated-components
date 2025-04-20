import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants'; 
import { BaseProps, SizeProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface RadioProps extends BaseProps, SizeProps {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: Color;
  motionVariant?: keyof typeof motionVariants;
}

export const Radio: React.FC<RadioProps> = ({
  className = '',
  label,
  name,
  value,
  checked,
  onChange,
  color = 'primary', 
  size = 'md',
  motionVariant = 'fadeIn',
  ...rest
}) => {
  const baseClasses = 'inline-flex items-center cursor-pointer';

  // Dynamic color classes
  const colorClasses = {
    primary: 'text-blue-600 focus:ring-blue-500 checked:border-blue-600 hover:text-blue-700',
    secondary: 'text-gray-600 focus:ring-gray-500 checked:border-gray-600 hover:text-gray-700',
    success: 'text-green-600 focus:ring-green-500 checked:border-green-600 hover:text-green-700',
    danger: 'text-red-600 focus:ring-red-500 checked:border-red-600 hover:text-red-700',
    warning: 'text-yellow-500 focus:ring-yellow-400 checked:border-yellow-500 hover:text-yellow-600',
    info: 'text-blue-400 focus:ring-blue-300 checked:border-blue-400 hover:text-blue-500',
  };

  // Dynamic size classes
  const sizeClasses = {
    xs: 'h-4 w-4',
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-7 w-7',
    xl: 'h-8 w-8',
  };

  return (
    <motion.label
      className={`${baseClasses} ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      variants={motionVariants[motionVariant]} // Using motion variant from utils
    >
      {/* Radio Input */}
      <input
      {...rest}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`form-radio rounded-full border-2 focus:ring-2 ${colorClasses[color]} ${
          sizeClasses[size]
        }`}
      />
      {/* Label */}
      <span className={`ml-2 font-medium ${colorClasses[color]}`}>{label}</span>
    </motion.label>
  );
};

