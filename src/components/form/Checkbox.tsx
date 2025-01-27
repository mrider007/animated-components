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
  color?: CheckboxColor;
  motionVariant?: keyof typeof motionVariants; 
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className = '',
  label,
  checked,
  onChange,
  color = 'primary',
  motionVariant = 'fadeIn',
}) => {
  const colorClasses = {
    primary: 'text-blue-600 focus:ring-blue-500 hover:text-blue-700',
    secondary: 'text-gray-600 focus:ring-gray-500 hover:text-gray-700',
    success: 'text-green-600 focus:ring-green-500 hover:text-green-700',
    danger: 'text-red-600 focus:ring-red-500 hover:text-red-700',
    warning: 'text-yellow-500 focus:ring-yellow-400 hover:text-yellow-600',
    info: 'text-blue-400 focus:ring-blue-300 hover:text-blue-500',
  };

  return (
    <motion.label
      className={`inline-flex items-center cursor-pointer select-none ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      variants={motionVariants[motionVariant]}
    >
      <input
        type="checkbox"
        className={`form-checkbox h-5 w-5 rounded focus:ring-2 ${colorClasses[color]}`}
        checked={checked}
        onChange={onChange}
      />
      <span className={`ml-2 font-medium ${colorClasses[color]}`}>{label}</span>
    </motion.label>
  );
};