'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

interface SliderProps extends BaseProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'; // Added color support
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
}

export const Slider: React.FC<SliderProps> = ({
  className = '',
  min,
  max,
  value,
  onChange,
  step = 1,
  color = 'primary', // Default color set to primary
  motionVariant = 'fadeIn', // Default motion variant
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  const colorClasses = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-indigo-600',
  };

  return (
    <div className={`relative w-full h-2 bg-gray-200 rounded-full ${className}`}>
      <motion.div
        className={`absolute h-full ${colorClasses[color]} rounded-full`}
        style={{ width: `${percentage}%` }}
        variants={motionVariants[motionVariant]} // Use motion variant
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
      ></motion.div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        step={step}
        className="absolute w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};
