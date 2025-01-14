'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps } from '../../../types/common';

interface SliderProps extends BaseProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
}

export const Slider: React.FC<SliderProps> = ({ className = '', min, max, value, onChange, step = 1 }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`relative w-full h-2 bg-gray-200 rounded-full ${className}`}>
      <motion.div
        className="absolute h-full bg-blue-600 rounded-full"
        style={{ width: `${percentage}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
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

