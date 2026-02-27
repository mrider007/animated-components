import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { motionVariants, getVariantVisible } from '../../utils/motionVariants';
import { BaseProps, SizeProps, RadiusProps, Radius } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | string;
type IconButtonVariant = 'solid' | 'outline' | 'ghost' | 'glass' | 'gradient' | string;
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | string;
type MotionVariantKey = keyof typeof motionVariants;

export interface IconButtonProps extends BaseProps, SizeProps, RadiusProps, Omit<HTMLMotionProps<'button'>, 'children'> {
  icon: React.ReactNode;
  variant?: IconButtonVariant;
  color?: Color;
  motionVariant?: MotionVariantKey;

  whileHoverAnimation?: MotionVariantKey;
  whileTapAnimation?: MotionVariantKey;
  whileFocusAnimation?: MotionVariantKey;
}

export const IconButton: React.FC<IconButtonProps> = ({
  className = '',
  color = 'primary',
  size = 'md',
  icon,
  onClick,
  disabled = false,
  variant = 'solid',
  motionVariant = 'fadeIn',
  radius = 'full',
  whileHover,
  whileTap,
  whileFocus,
  whileHoverAnimation,
  whileTapAnimation,
  whileFocusAnimation,
  ...rest
}) => {
  const baseClasses = disabled
    ? 'inline-flex items-center justify-center transition-all duration-300 ease-out focus:outline-none opacity-50 cursor-not-allowed'
    : 'inline-flex items-center justify-center transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2';

  const colorClasses: Record<Color, Record<IconButtonVariant, string>> = {
    primary: {
      solid: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg shadow-blue-500/20 active:scale-95',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 active:scale-95',
      ghost: 'text-blue-600 hover:bg-blue-50/80 focus:ring-blue-500 active:scale-95',
      glass: 'bg-blue-500/10 backdrop-blur-md text-blue-700 border border-blue-200/50 hover:bg-blue-500/20 focus:ring-blue-500 shadow-sm active:scale-95',
      gradient: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-lg shadow-blue-500/30 active:scale-95',
    },
    secondary: {
      solid: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700 shadow-lg shadow-gray-900/20 active:scale-95',
      outline: 'border-2 border-gray-600 text-gray-800 hover:bg-gray-50 focus:ring-gray-600 active:scale-95',
      ghost: 'text-gray-700 hover:bg-gray-100/80 focus:ring-gray-600 active:scale-95',
      glass: 'bg-gray-500/10 backdrop-blur-md text-gray-800 border border-gray-200/50 hover:bg-gray-500/20 focus:ring-gray-500 shadow-sm active:scale-95',
      gradient: 'bg-gradient-to-br from-gray-700 to-gray-900 text-white hover:from-gray-800 hover:to-black focus:ring-gray-700 shadow-lg shadow-gray-900/30 active:scale-95',
    },
    success: {
      solid: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400 shadow-lg shadow-green-500/20 active:scale-95',
      outline: 'border-2 border-green-500 text-green-600 hover:bg-green-50 focus:ring-green-400 active:scale-95',
      ghost: 'text-green-600 hover:bg-green-50/80 focus:ring-green-400 active:scale-95',
      glass: 'bg-green-500/10 backdrop-blur-md text-green-800 border border-green-200/50 hover:bg-green-500/20 focus:ring-green-500 shadow-sm active:scale-95',
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 focus:ring-green-400 shadow-lg shadow-green-500/30 active:scale-95',
    },
    danger: {
      solid: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-lg shadow-red-500/20 active:scale-95',
      outline: 'border-2 border-red-500 text-red-600 hover:bg-red-50 focus:ring-red-400 active:scale-95',
      ghost: 'text-red-600 hover:bg-red-50/80 focus:ring-red-400 active:scale-95',
      glass: 'bg-red-500/10 backdrop-blur-md text-red-800 border border-red-200/50 hover:bg-red-500/20 focus:ring-red-500 shadow-sm active:scale-95',
      gradient: 'bg-gradient-to-br from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 focus:ring-red-400 shadow-lg shadow-red-500/30 active:scale-95',
    },
    warning: {
      solid: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 focus:ring-yellow-400 shadow-lg shadow-yellow-400/20 active:scale-95',
      outline: 'border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-400 active:scale-95',
      ghost: 'text-yellow-600 hover:bg-yellow-50/80 focus:ring-yellow-400 active:scale-95',
      glass: 'bg-yellow-500/10 backdrop-blur-md text-yellow-800 border border-yellow-200/50 hover:bg-yellow-500/20 focus:ring-yellow-500 shadow-sm active:scale-95',
      gradient: 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 focus:ring-yellow-400 shadow-lg shadow-yellow-500/30 active:scale-95',
    },
    info: {
      solid: 'bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-400 shadow-lg shadow-cyan-500/20 active:scale-95',
      outline: 'border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 focus:ring-cyan-400 active:scale-95',
      ghost: 'text-cyan-600 hover:bg-cyan-50/80 focus:ring-cyan-400 active:scale-95',
      glass: 'bg-cyan-500/10 backdrop-blur-md text-cyan-800 border border-cyan-200/50 hover:bg-cyan-500/20 focus:ring-cyan-400 shadow-sm active:scale-95',
      gradient: 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 focus:ring-cyan-400 shadow-lg shadow-cyan-500/30 active:scale-95',
    },
  };

  const sizeClasses: Record<Size | string, string> = {
    xs: 'p-1.5 w-6 h-6',
    sm: 'p-2 w-8 h-8',
    md: 'p-2.5 w-10 h-10 md:w-11 md:h-11',
    lg: 'p-3 w-12 h-12 md:w-14 md:h-14',
    xl: 'p-4 w-14 h-14 md:w-16 md:h-16',
    '2xl': 'p-5 w-16 h-16 md:w-20 md:h-20',
    full: 'p-4 w-full h-full',
  };

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

  const computedWhileHover = whileHoverAnimation
    ? getVariantVisible(whileHoverAnimation)
    : (whileHover || { scale: 1.05, y: -2 });

  const computedWhileTap = whileTapAnimation
    ? getVariantVisible(whileTapAnimation)
    : (whileTap || { scale: 0.95 });

  const computedWhileFocus = whileFocusAnimation
    ? getVariantVisible(whileFocusAnimation)
    : whileFocus;

  const resolvedColorClass = colorClasses[color] ? (colorClasses[color][variant] || colorClasses.primary.solid) : colorClasses.primary.solid;
  const resolvedSizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <motion.button
      className={`${baseClasses} ${resolvedColorClass} ${resolvedSizeClass} ${getRadiusClasses()} ${className}`.trim().replace(/\s+/g, ' ')}
      onClick={onClick}
      disabled={disabled}
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
      whileHover={disabled ? undefined : computedWhileHover}
      whileTap={disabled ? undefined : computedWhileTap}
      whileFocus={computedWhileFocus}
      {...rest}
    >
      {icon}
    </motion.button>
  );
};
