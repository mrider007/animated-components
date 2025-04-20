import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { BaseProps, ColorProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

export type MotionVariantKey = keyof typeof motionVariants;
export type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface ProgressBarProps extends BaseProps, ColorProps, MotionProps {
  /** Current value */
  value: number;
  /** Maximum value */
  max?: number;
  /** Semantic color key */
  color?: Color;
  /** Override height utility class */
  heightClass?: string;
  /** Container background class */
  containerBgClass?: string;
  /** Bar background class override (falls back to color key) */
  barBgClass?: string;
  /** Motion variant key */
  motionVariant?: MotionVariantKey;
  /** Animation duration in seconds */
  duration?: number;
  /** Loop animation */
  loop?: boolean;
  /** Show percentage label */
  showLabel?: boolean;
  /** Label container class */
  labelClassName?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  className = '',
  value,
  max = 100,
  color = 'primary',
  heightClass = 'h-2.5',
  containerBgClass = 'bg-gray-200',
  barBgClass,
  motionVariant = 'fadeIn',
  duration = 0.5,
  loop = false,
  showLabel = false,
  labelClassName = 'text-xs font-medium text-gray-700 ml-2',
  ...rest
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const defaultColorMap: Record<Color, string> = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-indigo-600',
  };

  const barClass = barBgClass || defaultColorMap[color];

  const transition = {
    duration,
    ...(loop ? { repeat: Infinity, repeatType: 'loop' as const } : {}),
  };

  return (
    <div className={`flex items-center ${className}`}>      
      <div className={`relative w-full ${containerBgClass} rounded-full ${heightClass}`}>        
        <motion.div
          className={`absolute left-0 top-0 rounded-full ${heightClass} ${barClass}`}
          style={{ width: `${percentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={transition}
          variants={motionVariants[motionVariant]}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          {...rest}
        />
      </div>
      {showLabel && (
        <span className={labelClassName}>
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};
