'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { BaseProps, RadiusProps, VariantProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | string;
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | string;

export interface BadgeProps extends BaseProps, RadiusProps, VariantProps, Omit<HTMLMotionProps<"span">, "children"> {
  children?: React.ReactNode;
  motionVariant?: keyof typeof motionVariants;
  color?: Color;
  size?: Size;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  color = 'primary',
  size = 'md',
  variant = 'solid',
  radius = 'full',
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
      case 'full': return 'rounded-full';
      default: return `rounded-${radius}`;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'solid':
        return {
          primary: 'bg-blue-600 text-white shadow-sm shadow-blue-500/20',
          secondary: 'bg-gray-700 text-white shadow-sm shadow-gray-700/20',
          success: 'bg-green-500 text-white shadow-sm shadow-green-500/20',
          danger: 'bg-red-500 text-white shadow-sm shadow-red-500/20',
          warning: 'bg-yellow-400 text-gray-900 shadow-sm shadow-yellow-400/20',
          info: 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/20',
        }[color] || 'bg-blue-600 text-white';
      case 'outline':
        return {
          primary: 'border border-blue-600 text-blue-600',
          secondary: 'border border-gray-600 text-gray-700',
          success: 'border border-green-500 text-green-600',
          danger: 'border border-red-500 text-red-600',
          warning: 'border border-yellow-500 text-yellow-600',
          info: 'border border-cyan-500 text-cyan-600',
        }[color] || 'border border-blue-600 text-blue-600';
      case 'glass':
        return {
          primary: 'bg-blue-500/10 backdrop-blur-md text-blue-700 border border-blue-200/50',
          secondary: 'bg-gray-500/10 backdrop-blur-md text-gray-800 border border-gray-200/50',
          success: 'bg-green-500/10 backdrop-blur-md text-green-800 border border-green-200/50',
          danger: 'bg-red-500/10 backdrop-blur-md text-red-800 border border-red-200/50',
          warning: 'bg-yellow-500/10 backdrop-blur-md text-yellow-800 border border-yellow-200/50',
          info: 'bg-cyan-500/10 backdrop-blur-md text-cyan-800 border border-cyan-200/50',
        }[color] || 'bg-blue-500/10 backdrop-blur-md text-blue-700 border border-blue-200/50';
      case 'gradient':
        return {
          primary: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30',
          secondary: 'bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-md shadow-gray-900/30',
          success: 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/30',
          danger: 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-md shadow-red-500/30',
          warning: 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-md shadow-yellow-500/30',
          info: 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-md shadow-cyan-500/30',
        }[color] || 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white';
      default:
        // By default use a soft pastel logic similar to old implementation
        return {
          primary: 'bg-blue-100 text-blue-800',
          secondary: 'bg-gray-100 text-gray-800',
          success: 'bg-green-100 text-green-800',
          danger: 'bg-red-100 text-red-800',
          warning: 'bg-yellow-100 text-yellow-800',
          info: 'bg-indigo-100 text-indigo-800',
        }[color] || 'bg-blue-100 text-blue-800';
    }
  };

  const sizeClasses: Record<string, string> = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1 text-base',
    xl: 'px-4 py-1.5 text-lg',
    '2xl': 'px-5 py-2 text-xl',
    full: 'px-6 py-3 text-2xl',
  };

  return (
    <motion.span
      className={`inline-flex items-center justify-center font-medium ${sizeClasses[size] || sizeClasses.md} ${getRadiusClasses()} ${getVariantClasses()} ${className}`}
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
      exit="hidden"
      {...rest}
    >
      {children}
    </motion.span>
  );
};
