'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants'; 
import { BaseProps } from '../../../types/common';

type CheckboxColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface CheckboxProps extends BaseProps {
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: CheckboxColor; // Customizable color for the checkbox
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className = '',
  label,
  checked,
  onChange,
  color = 'primary', // Default color
  motionVariant = 'fadeIn', // Default motion variant
}) => {
  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-yellow-500',
    info: 'text-blue-400',
  };

  return (
    <motion.label
      className={`inline-flex items-center ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      variants={motionVariants[motionVariant]}
    >
      <input
        type="checkbox"
        className={`form-checkbox h-5 w-5 ${colorClasses[color]}`}
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </motion.label>
  );
};
