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
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
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
  motionVariant = 'fadeIn', // Default motion variant
}) => {
  const baseClasses = 'inline-flex items-center';

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-yellow-500',
    info: 'text-blue-400',
  };

  const sizeClasses = {
    xs: 'h-4 w-4',
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-7 w-7',
    xl: 'h-8 w-8',
  };

  return (
    <motion.label
      className={`${baseClasses} ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      variants={motionVariants[motionVariant]} // Using motion variant from utils
      transition={{ duration: 0.3 }}
    >
      <input
        type="radio"
        className="form-radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </motion.label>
  );
};
