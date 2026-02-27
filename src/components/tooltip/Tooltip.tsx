'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps, RadiusProps, Radius, VariantProps } from '../../../types/common';

type TooltipColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | string;
type TooltipVariant = 'flat' | 'solid' | 'glass' | string;

export interface TooltipProps extends BaseProps, RadiusProps, Omit<HTMLMotionProps<"div">, "children" | "content" | "color" | "className" | "variant"> {
  /** The element the tooltip wraps */
  children: React.ReactNode;
  /** Tooltip content text */
  content: string | React.ReactNode;
  /** Position of the tooltip */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Color theme */
  color?: TooltipColor;
  /** Visual Variant */
  variant?: TooltipVariant;
  /** Predefined motion variant */
  motionVariant?: keyof typeof motionVariants;
  /** Delay before showing tooltip (ms) */
  delay?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  className = '',
  content,
  position = 'top',
  color = 'secondary', // Secondary (dark gray) is usually a better default for tooltips
  variant = 'solid',
  radius = 'md',
  motionVariant = 'fadeIn',
  delay = 200, // Small delay prevents flickering
  disabled = false,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const getRadiusClasses = () => {
    switch (radius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case 'xl': return 'rounded-xl';
      case '2xl': return 'rounded-2xl';
      case 'full': return 'rounded-3xl';
      default: return `rounded-${radius}`;
    }
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  };

  const colorStyles: Record<string, Record<string, string>> = {
    primary: {
      flat: 'bg-blue-50 text-blue-800 border border-blue-200',
      solid: 'bg-blue-600 text-white shadow-md shadow-blue-500/20',
      glass: 'bg-blue-500/80 backdrop-blur-md text-white border border-blue-400/30',
    },
    secondary: {
      flat: 'bg-gray-50 text-gray-800 border border-gray-200',
      solid: 'bg-gray-800 text-white shadow-md shadow-gray-800/20',
      glass: 'bg-gray-800/80 backdrop-blur-md text-white border border-gray-600/30',
    },
    success: {
      flat: 'bg-green-50 text-green-800 border border-green-200',
      solid: 'bg-green-600 text-white shadow-md shadow-green-500/20',
      glass: 'bg-green-600/80 backdrop-blur-md text-white border border-green-400/30',
    },
    danger: {
      flat: 'bg-red-50 text-red-800 border border-red-200',
      solid: 'bg-red-600 text-white shadow-md shadow-red-500/20',
      glass: 'bg-red-600/80 backdrop-blur-md text-white border border-red-400/30',
    },
    warning: {
      flat: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
      solid: 'bg-yellow-500 text-gray-900 shadow-md shadow-yellow-500/20',
      glass: 'bg-yellow-500/80 backdrop-blur-md text-gray-900 border border-yellow-400/30',
    },
    info: {
      flat: 'bg-cyan-50 text-cyan-800 border border-cyan-200',
      solid: 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20',
      glass: 'bg-cyan-600/80 backdrop-blur-md text-white border border-cyan-400/30',
    },
  };

  const appliedTheme = (colorStyles[color] || colorStyles.secondary)[variant] || colorStyles.secondary.solid;

  const show = () => {
    if (disabled) return;
    if (delay > 0) {
      const id = setTimeout(() => setIsVisible(true), delay);
      setTimeoutId(id);
    } else {
      setIsVisible(true);
    }
  };

  const hide = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const tooltipId = `tooltip-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={isVisible ? tooltipId : undefined}
      >
        {children}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            className={`absolute z-50 px-3 py-1.5 text-xs font-medium shadow-sm whitespace-nowrap pointer-events-none ${positionClasses[position]} ${getRadiusClasses()} ${appliedTheme} ${className}`}
            variants={motionVariants[motionVariant]}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.15, ease: 'easeOut' }}
            {...rest}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
