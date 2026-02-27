'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { BaseProps, RadiusProps, VariantProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | string;
type SliderVariant = 'flat' | 'glow' | string;

export interface SliderProps extends BaseProps, RadiusProps, Omit<HTMLMotionProps<"div">, "children" | "onChange" | "color" | "variant"> {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  color?: Color;
  variant?: SliderVariant;
  motionVariant?: keyof typeof motionVariants;
}

export const Slider: React.FC<SliderProps> = ({
  className = '',
  min,
  max,
  value,
  onChange,
  step = 1,
  color = 'primary',
  variant = 'flat',
  radius = 'full',
  motionVariant = 'fadeIn',
  ...rest
}) => {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const getRadiusClasses = () => {
    switch (radius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case 'xl': return 'rounded-xl';
      case '2xl': return 'rounded-2xl';
      case 'full': return 'rounded-full';
      default: return `rounded-${radius}`;
    }
  };

  const colorStyles: Record<string, Record<string, { track: string; thumb: string; glow: string }>> = {
    primary: {
      flat: { track: 'bg-blue-500', thumb: 'border-blue-500', glow: '' },
      glow: { track: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]', thumb: 'border-blue-500', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.8)]' },
    },
    secondary: {
      flat: { track: 'bg-gray-500', thumb: 'border-gray-500', glow: '' },
      glow: { track: 'bg-gray-500 shadow-[0_0_10px_rgba(107,114,128,0.6)]', thumb: 'border-gray-500', glow: 'shadow-[0_0_15px_rgba(107,114,128,0.8)]' },
    },
    success: {
      flat: { track: 'bg-green-500', thumb: 'border-green-500', glow: '' },
      glow: { track: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]', thumb: 'border-green-500', glow: 'shadow-[0_0_15px_rgba(34,197,94,0.8)]' },
    },
    danger: {
      flat: { track: 'bg-red-500', thumb: 'border-red-500', glow: '' },
      glow: { track: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]', thumb: 'border-red-500', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.8)]' },
    },
    warning: {
      flat: { track: 'bg-yellow-500', thumb: 'border-yellow-500', glow: '' },
      glow: { track: 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)]', thumb: 'border-yellow-500', glow: 'shadow-[0_0_15px_rgba(234,179,8,0.8)]' },
    },
    info: {
      flat: { track: 'bg-cyan-500', thumb: 'border-cyan-500', glow: '' },
      glow: { track: 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]', thumb: 'border-cyan-500', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.8)]' },
    },
  };

  const theme = (colorStyles[color] || colorStyles.primary)[variant] || colorStyles.primary.flat;

  return (
    <motion.div
      className={`relative w-full h-8 flex items-center group ${className}`}
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
      {...rest}
    >
      {/* Background Track */}
      <div className={`absolute w-full h-2 bg-gray-200 ${getRadiusClasses()}`} />

      {/* Active Track */}
      <motion.div
        className={`absolute h-2 ${theme.track} ${getRadiusClasses()}`}
        style={{ width: `${percentage}%` }}
        layoutId={`slider-track-${className}`}
        transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
      />

      {/* Thumb Indicator */}
      <motion.div
        className={`absolute w-5 h-5 bg-white border-2 rounded-full cursor-grab active:cursor-grabbing focus:ring-4 focus:ring-black/5 z-10 ${theme.thumb} ${theme.glow}`}
        style={{ left: `calc(${percentage}% - 10px)` }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />

      {/* Hidden Native Input for Accessibility/Logic */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        step={step}
        className="absolute w-full h-full opacity-0 cursor-pointer z-20"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
      />
    </motion.div>
  );
};
