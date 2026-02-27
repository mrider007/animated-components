import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { BaseProps, RadiusProps, Radius, VariantProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

export type MotionVariantKey = keyof typeof motionVariants;
export type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | string;
export type ProgressVariant = 'flat' | 'glow' | 'gradient' | string;

export interface ProgressBarProps extends BaseProps, RadiusProps, Omit<HTMLMotionProps<"div">, "children" | "variant"> {
  /** Current value */
  value: number;
  /** Maximum value */
  max?: number;
  /** Semantic color key */
  color?: Color;
  /** Variant style */
  variant?: ProgressVariant;
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
  variant = 'flat',
  radius = 'full',
  heightClass = 'h-2.5',
  containerBgClass = 'bg-gray-100',
  barBgClass,
  motionVariant = 'fadeIn',
  duration = 0.8,
  loop = false,
  showLabel = false,
  labelClassName = 'text-xs font-semibold text-gray-500 ml-3 tabular-nums w-10 text-right',
  ...rest
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

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

  const colorStyles: Record<string, Record<string, string>> = {
    primary: {
      flat: 'bg-blue-500',
      glow: 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]',
      gradient: 'bg-gradient-to-r from-blue-400 to-indigo-500',
    },
    secondary: {
      flat: 'bg-gray-500',
      glow: 'bg-gray-500 shadow-[0_0_15px_rgba(107,114,128,0.5)]',
      gradient: 'bg-gradient-to-r from-gray-400 to-slate-600',
    },
    success: {
      flat: 'bg-green-500',
      glow: 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]',
      gradient: 'bg-gradient-to-r from-green-400 to-emerald-500',
    },
    danger: {
      flat: 'bg-red-500',
      glow: 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]',
      gradient: 'bg-gradient-to-r from-red-400 to-rose-500',
    },
    warning: {
      flat: 'bg-yellow-500',
      glow: 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]',
      gradient: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    },
    info: {
      flat: 'bg-cyan-500',
      glow: 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]',
      gradient: 'bg-gradient-to-r from-cyan-400 to-blue-500',
    },
  };

  const barClass = barBgClass || (colorStyles[color] || colorStyles.primary)[variant] || colorStyles.primary.flat;

  const transition = {
    duration,
    ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a snappier fill
    ...(loop ? { repeat: Infinity, repeatType: 'loop' as const } : {}),
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`relative w-full ${containerBgClass} ${getRadiusClasses()} ${heightClass} overflow-hidden shadow-inner`}>
        <motion.div
          className={`absolute left-0 top-0 h-full ${getRadiusClasses()} ${barClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={transition}
          variants={motionVariants[motionVariant]}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          {...rest}
        />
        {/* Animated shimmer effect for gradient variant */}
        {variant === 'gradient' && percentage > 0 && (
          <motion.div
            className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              className={`h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent ${getRadiusClasses()}`}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </motion.div>
        )}
      </div>
      {showLabel && (
        <span className={labelClassName}>
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};
