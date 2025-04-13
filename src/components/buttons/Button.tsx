import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { motionVariants,getVariantVisible } from '../../utils/motionVariants';
import { BaseProps, SizeProps } from '../../../types/common';



type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type MotionVariantKey = keyof typeof motionVariants;

interface ButtonProps extends BaseProps, SizeProps, HTMLMotionProps<'button'> {
  variant?: 'solid' | 'outline' | 'ghost';
  color?: Color;
  /**
   * Predefined motion variant name from motionVariants.
   * This will apply the corresponding animation configuration.
   */
  motionVariant?: MotionVariantKey;
  whileHoverAnimation?: MotionVariantKey;
  whileTapAnimation?: MotionVariantKey;
  whileFocusAnimation?: MotionVariantKey;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  color = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  variant = 'solid',
  motionVariant = 'fadeIn',
  // Standard Framer Motion props
  whileHover,
  whileTap,
  whileFocus,
  // Additional ease animation props
  whileHoverAnimation,
  whileTapAnimation,
  whileFocusAnimation,
  ...rest
}) => {
  const baseClasses =
    'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';

  const colorClasses: Record<Color, Record<'solid' | 'outline' | 'ghost', string>> = {
    primary: {
      solid: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    },
    secondary: {
      solid: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      outline: 'border border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
    },
    success: {
      solid: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      outline: 'border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
      ghost: 'text-green-600 hover:bg-green-50 focus:ring-green-500',
    },
    danger: {
      solid: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      outline: 'border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
      ghost: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
    },
    warning: {
      solid: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400',
      outline: 'border border-yellow-500 text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-400',
      ghost: 'text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-400',
    },
    info: {
      solid: 'bg-blue-400 text-white hover:bg-blue-500 focus:ring-blue-300',
      outline: 'border border-blue-400 text-blue-400 hover:bg-blue-50 focus:ring-blue-300',
      ghost: 'text-blue-400 hover:bg-blue-50 focus:ring-blue-300',
    },
  };

  const sizeClasses: Record<string, string> = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-2 text-lg',
    xl: 'px-6 py-3 text-xl',
  };

  const computedWhileHover = whileHoverAnimation 
    ? getVariantVisible(whileHoverAnimation)
    : whileHover;
  
  const computedWhileTap = whileTapAnimation 
    ? getVariantVisible(whileTapAnimation)
    : whileTap;
  
  const computedWhileFocus = whileFocusAnimation 
    ? getVariantVisible(whileFocusAnimation)
    : whileFocus;

  return (
    <motion.button
      className={`${baseClasses} ${colorClasses[color][variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
      whileHover={computedWhileHover}
      whileTap={computedWhileTap}
      whileFocus={computedWhileFocus}
      {...rest}
    >
      {children}
    </motion.button>
  );
};
