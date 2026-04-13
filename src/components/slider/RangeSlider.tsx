'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

export interface RangeSliderProps extends BaseProps {
  min: number;
  max: number;
  values: [number, number];
  onChange: (values: [number, number]) => void;
  step?: number;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'; // Added color support
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  className = '',
  min,
  max,
  values,
  onChange,
  step = 1,
  color = 'primary', // Default color set to primary
  motionVariant = 'fadeIn', // Default motion variant
}) => {
  const [minValue, maxValue] = values;
  const minPercentage = ((minValue - min) / (max - min)) * 100;
  const maxPercentage = ((maxValue - min) / (max - min)) * 100;

  const colorClasses = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-indigo-600',
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = Math.min(Number(e.target.value), maxValue - step);
    onChange([newMinValue, maxValue]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = Math.max(Number(e.target.value), minValue + step);
    onChange([minValue, newMaxValue]);
  };

  return (
    <div className={`relative w-full h-2 bg-gray-200 rounded-full ${className}`}>
      <motion.div
        className={`absolute h-full ${colorClasses[color]} rounded-full`}
        style={{ left: `${minPercentage}%`, right: `${100 - maxPercentage}%` }}
        variants={motionVariants[motionVariant]} // Use motion variant
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
      ></motion.div>
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        onChange={handleMinChange}
        step={step}
        className="absolute w-full h-full opacity-0 cursor-pointer"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        onChange={handleMaxChange}
        step={step}
        className="absolute w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};
