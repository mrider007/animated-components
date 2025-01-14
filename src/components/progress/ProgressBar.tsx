import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps, ColorProps } from '../../../types/common';

interface ProgressBarProps extends BaseProps, ColorProps {
  value: number;
  max?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ className = '', color = 'primary', value, max = 100 }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colorClasses = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-indigo-600',
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <motion.div
        className={`h-2.5 rounded-full ${colorClasses[color]}`}
        style={{ width: `${percentage}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5 }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      ></motion.div>
    </div>
  );
};

