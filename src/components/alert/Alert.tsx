'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { BaseProps, RadiusProps, Radius, VariantProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | string;
type AlertVariant = 'flat' | 'solid' | 'glass' | string;

export interface AlertProps extends BaseProps, RadiusProps, Omit<HTMLMotionProps<"div">, "children"> {
  children?: React.ReactNode;
  onClose?: () => void;
  motionVariant?: keyof typeof motionVariants;
  color?: Color;
  variant?: AlertVariant;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  className = '',
  color = 'primary',
  variant = 'flat',
  radius = 'lg',
  onClose,
  motionVariant = 'fadeIn',
  ...rest
}) => {
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

  const colorClasses: Record<string, Record<string, string>> = {
    primary: {
      flat: 'bg-blue-50 text-blue-800 border border-blue-200',
      solid: 'bg-blue-600 text-white shadow-md shadow-blue-500/20',
      glass: 'bg-blue-500/10 backdrop-blur-md text-blue-800 border border-blue-200/50',
    },
    secondary: {
      flat: 'bg-gray-50 text-gray-800 border border-gray-200',
      solid: 'bg-gray-700 text-white shadow-md shadow-gray-700/20',
      glass: 'bg-gray-500/10 backdrop-blur-md text-gray-800 border border-gray-200/50',
    },
    success: {
      flat: 'bg-green-50 text-green-800 border border-green-200',
      solid: 'bg-green-600 text-white shadow-md shadow-green-500/20',
      glass: 'bg-green-500/10 backdrop-blur-md text-green-800 border border-green-200/50',
    },
    danger: {
      flat: 'bg-red-50 text-red-800 border border-red-200',
      solid: 'bg-red-600 text-white shadow-md shadow-red-500/20',
      glass: 'bg-red-500/10 backdrop-blur-md text-red-800 border border-red-200/50',
    },
    warning: {
      flat: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
      solid: 'bg-yellow-500 text-gray-900 shadow-md shadow-yellow-500/20',
      glass: 'bg-yellow-500/10 backdrop-blur-md text-yellow-800 border border-yellow-200/50',
    },
    info: {
      flat: 'bg-cyan-50 text-cyan-800 border border-cyan-200',
      solid: 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20',
      glass: 'bg-cyan-500/10 backdrop-blur-md text-cyan-800 border border-cyan-200/50',
    },
  };

  const closeButtonClasses: Record<string, Record<string, string>> = {
    primary: {
      flat: 'text-blue-500 hover:bg-blue-100 hover:text-blue-700 focus:ring-blue-400',
      solid: 'text-white/80 hover:bg-white/20 hover:text-white focus:ring-white/50',
      glass: 'text-blue-500 hover:bg-blue-500/10 hover:text-blue-700 focus:ring-blue-400',
    },
    secondary: {
      flat: 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:ring-gray-400',
      solid: 'text-white/80 hover:bg-white/20 hover:text-white focus:ring-white/50',
      glass: 'text-gray-500 hover:bg-gray-500/10 hover:text-gray-700 focus:ring-gray-400',
    },
    success: {
      flat: 'text-green-500 hover:bg-green-100 hover:text-green-700 focus:ring-green-400',
      solid: 'text-white/80 hover:bg-white/20 hover:text-white focus:ring-white/50',
      glass: 'text-green-500 hover:bg-green-500/10 hover:text-green-700 focus:ring-green-400',
    },
    danger: {
      flat: 'text-red-500 hover:bg-red-100 hover:text-red-700 focus:ring-red-400',
      solid: 'text-white/80 hover:bg-white/20 hover:text-white focus:ring-white/50',
      glass: 'text-red-500 hover:bg-red-500/10 hover:text-red-700 focus:ring-red-400',
    },
    warning: {
      flat: 'text-yellow-600 hover:bg-yellow-100 hover:text-yellow-800 focus:ring-yellow-500',
      solid: 'text-gray-600 hover:bg-black/10 hover:text-gray-900 focus:ring-black/20',
      glass: 'text-yellow-600 hover:bg-yellow-500/10 hover:text-yellow-800 focus:ring-yellow-500',
    },
    info: {
      flat: 'text-cyan-500 hover:bg-cyan-100 hover:text-cyan-700 focus:ring-cyan-400',
      solid: 'text-white/80 hover:bg-white/20 hover:text-white focus:ring-white/50',
      glass: 'text-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-700 focus:ring-cyan-400',
    },
  };

  // Safe fallbacks using "primary" and "flat" structure if colors are unknown
  const appliedVariant = (colorClasses[color] || colorClasses.primary)[variant] || colorClasses.primary.flat;
  const appliedCloseButton = (closeButtonClasses[color] || closeButtonClasses.primary)[variant] || closeButtonClasses.primary.flat;

  return (
    <motion.div
      className={`p-4 ${getRadiusClasses()} ${appliedVariant} ${className}`}
      role="alert"
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
      exit="hidden"
      {...rest}
    >
      <div className="flex items-start">
        <div className="flex-grow pt-0.5">{children}</div>
        {onClose && (
          <button
            type="button"
            className={`ml-3 -mr-1 -mt-1 rounded-lg focus:outline-none focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 transition-colors duration-200 ${appliedCloseButton}`}
            onClick={onClose}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
};
