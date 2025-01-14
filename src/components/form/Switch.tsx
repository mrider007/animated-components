import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants'; 
import { BaseProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface SwitchProps extends BaseProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  color?: Color;
  motionVariant?: keyof typeof motionVariants; 
}

export const Switch: React.FC<SwitchProps> = ({
  className = '',
  checked,
  onChange,
  label,
  color = 'primary',
  motionVariant = 'fadeIn', // Default motion variant
}) => {
  const baseClasses = 'inline-flex items-center cursor-pointer';

  const colorClasses = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-500',
    info: 'bg-blue-400',
  };

  return (
    <motion.label
      className={`${baseClasses} ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      variants={motionVariants[motionVariant]} // Applying the motion variant from utils
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`w-10 h-6 bg-gray-200 rounded-full shadow-inner ${checked ? colorClasses[color] : ''}`}
        ></div>
        <div
          className={`absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 left-1 transition-transform duration-200 ease-in-out ${checked ? 'transform translate-x-4' : ''}`}
        ></div>
      </div>
      {label && <span className="ml-3 text-sm font-medium text-gray-900">{label}</span>}
    </motion.label>
  );
};
