import React from 'react';
import { motion, HTMLMotionProps, Variants, Transition } from 'framer-motion';
import { motionVariants, getVariantVisible } from '../../utils/motionVariants';
import { BaseProps, SizeProps, RadiusProps, Radius } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | string;
type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'glass' | 'gradient' | string;
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | string;
type MotionVariantKey = keyof typeof motionVariants;

export interface ButtonProps extends BaseProps, SizeProps, RadiusProps, Omit<HTMLMotionProps<'button'>, 'children'> {
  /**
   * Button content
   */
  children?: React.ReactNode;
  /**
   * Visual style of the button
   * @default 'solid'
   */
  variant?: ButtonVariant;

  /**
   * Border radius
   * @default 'xl'
   */
  radius?: Radius;

  /**
   * Color theme of the button
   * @default 'primary'
   */
  color?: Color;

  /**
   * Predefined motion variant from motionVariants for initial animation
   * @default 'fadeIn'
   */
  motionVariant?: MotionVariantKey;

  /**
   * Custom animation variants to override default motionVariants
   */
  customVariants?: Variants;

  /**
   * Predefined motion variant for hover animation
   */
  whileHoverAnimation?: MotionVariantKey;

  /**
   * Predefined motion variant for tap animation
   */
  whileTapAnimation?: MotionVariantKey;

  /**
   * Predefined motion variant for focus animation
   */
  whileFocusAnimation?: MotionVariantKey;

  /**
   * Custom transition for initial animation
   */
  customTransition?: Transition;

  /**
   * Custom hover animation properties
   */
  customHoverAnimation?: Record<string, any>;

  /**
   * Custom tap animation properties
   */
  customTapAnimation?: Record<string, any>;

  /**
   * Custom focus animation properties
   */
  customFocusAnimation?: Record<string, any>;

  /**
   * Custom class names for different button states
   */
  stateClasses?: {
    hover?: string;
    focus?: string;
    active?: string;
    disabled?: string;
  };

  /**
   * Custom class names for different variants and colors
   */
  customClasses?: {
    [variant in ButtonVariant]?: {
      [color in Color]?: string;
    };
  };

  /**
   * Custom size class mapping
   */
  customSizeClasses?: Record<Size, string>;

  /**
   * Whether to use animation on initial render
   * @default true
   */
  useAnimation?: boolean;

  /**
   * Custom base classes to override defaults
   */
  baseClassName?: string;

  /**
   * Option to bypass default styling completely
   * @default false
   */
  unstyled?: boolean;

  /**
   * Button type attribute
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Show loading spinner and disable the button
   * @default false
   */
  loading?: boolean;

  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display after the button text
   */
  rightIcon?: React.ReactNode;

  /**
   * Make the button full width
   * @default false
   */
  fullWidth?: boolean;
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
  radius = 'xl',
  customVariants,
  customTransition,
  // Standard Framer Motion props
  whileHover,
  whileTap,
  whileFocus,
  // Additional animation props
  whileHoverAnimation,
  whileTapAnimation,
  whileFocusAnimation,
  customHoverAnimation,
  customTapAnimation,
  customFocusAnimation,
  // Styling customization
  stateClasses = {},
  customClasses = {},
  customSizeClasses,
  baseClassName,
  unstyled = false,
  useAnimation = true,
  type = 'button',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  ...rest
}) => {
  // Default base classes if not unstyled and no custom base class provided
  const defaultBaseClasses = 'font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Use either provided base class, default base class, or none if unstyled
  const baseClasses = unstyled ? '' : (baseClassName || defaultBaseClasses);

  // Default color classes for different variants
  const defaultColorClasses: Record<Color, Record<ButtonVariant, string>> = {
    primary: {
      solid: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg shadow-blue-500/20 active:scale-95',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 active:scale-95',
      ghost: 'text-blue-600 hover:bg-blue-50/80 focus:ring-blue-500 active:scale-95',
      glass: 'bg-blue-500/10 backdrop-blur-md text-blue-700 border border-blue-200/50 hover:bg-blue-500/20 focus:ring-blue-500 shadow-sm active:scale-95',
      gradient: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-lg shadow-blue-500/30 active:scale-95',
    },
    secondary: {
      solid: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700 shadow-lg shadow-gray-900/20 active:scale-95',
      outline: 'border-2 border-gray-600 text-gray-800 hover:bg-gray-50 focus:ring-gray-600 active:scale-95',
      ghost: 'text-gray-700 hover:bg-gray-100/80 focus:ring-gray-600 active:scale-95',
      glass: 'bg-gray-500/10 backdrop-blur-md text-gray-800 border border-gray-200/50 hover:bg-gray-500/20 focus:ring-gray-500 shadow-sm active:scale-95',
      gradient: 'bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-gray-800 hover:to-black focus:ring-gray-700 shadow-lg shadow-gray-900/30 active:scale-95',
    },
    success: {
      solid: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400 shadow-lg shadow-green-500/20 active:scale-95',
      outline: 'border-2 border-green-500 text-green-600 hover:bg-green-50 focus:ring-green-400 active:scale-95',
      ghost: 'text-green-600 hover:bg-green-50/80 focus:ring-green-400 active:scale-95',
      glass: 'bg-green-500/10 backdrop-blur-md text-green-800 border border-green-200/50 hover:bg-green-500/20 focus:ring-green-500 shadow-sm active:scale-95',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 focus:ring-green-400 shadow-lg shadow-green-500/30 active:scale-95',
    },
    danger: {
      solid: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-lg shadow-red-500/20 active:scale-95',
      outline: 'border-2 border-red-500 text-red-600 hover:bg-red-50 focus:ring-red-400 active:scale-95',
      ghost: 'text-red-600 hover:bg-red-50/80 focus:ring-red-400 active:scale-95',
      glass: 'bg-red-500/10 backdrop-blur-md text-red-800 border border-red-200/50 hover:bg-red-500/20 focus:ring-red-500 shadow-sm active:scale-95',
      gradient: 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 focus:ring-red-400 shadow-lg shadow-red-500/30 active:scale-95',
    },
    warning: {
      solid: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 focus:ring-yellow-400 shadow-lg shadow-yellow-400/20 active:scale-95',
      outline: 'border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-400 active:scale-95',
      ghost: 'text-yellow-600 hover:bg-yellow-50/80 focus:ring-yellow-400 active:scale-95',
      glass: 'bg-yellow-500/10 backdrop-blur-md text-yellow-800 border border-yellow-200/50 hover:bg-yellow-500/20 focus:ring-yellow-500 shadow-sm active:scale-95',
      gradient: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 focus:ring-yellow-400 shadow-lg shadow-yellow-500/30 active:scale-95',
    },
    info: {
      solid: 'bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-400 shadow-lg shadow-cyan-500/20 active:scale-95',
      outline: 'border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 focus:ring-cyan-400 active:scale-95',
      ghost: 'text-cyan-600 hover:bg-cyan-50/80 focus:ring-cyan-400 active:scale-95',
      glass: 'bg-cyan-500/10 backdrop-blur-md text-cyan-800 border border-cyan-200/50 hover:bg-cyan-500/20 focus:ring-cyan-400 shadow-sm active:scale-95',
      gradient: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 focus:ring-cyan-400 shadow-lg shadow-cyan-500/30 active:scale-95',
    },
  };

  // Default size classes
  const defaultSizeClasses: Record<Size | string, string> = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm md:text-base',
    lg: 'px-5 py-2.5 text-base md:text-lg',
    xl: 'px-6 py-3 text-lg md:text-xl',
    '2xl': 'px-8 py-4 text-xl md:text-2xl',
    full: 'w-full px-4 py-2 text-base md:text-lg',
  };

  const getRadiusClasses = () => {
    if (unstyled) return '';
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

  // Determine the appropriate color classes
  const getColorClasses = () => {
    if (unstyled) return '';

    // Check if custom classes are provided for this variant and color combination
    if (customClasses?.[variant]?.[color]) {
      return customClasses[variant][color];
    }

    // If we have a predefined color class for this variant and color
    if (defaultColorClasses[color]?.[variant]) {
      return defaultColorClasses[color][variant];
    }

    // Fallback to primary if the combination doesn't exist
    return defaultColorClasses.primary[variant] || '';
  };

  // Determine the appropriate size classes
  const getSizeClasses = () => {
    if (unstyled) return '';

    // Use custom size classes if provided, otherwise default
    const sizeClassMap = customSizeClasses || defaultSizeClasses;
    return sizeClassMap[size] || defaultSizeClasses.md;
  };

  // Determine state-specific classes
  const getStateClasses = () => {
    if (unstyled) return '';

    return disabled && stateClasses.disabled ? stateClasses.disabled : '';
  };

  // Compute all classes
  const computedClasses = `
    ${baseClasses}
    ${getColorClasses()}
    ${getSizeClasses()}
    ${getRadiusClasses()}
    ${getStateClasses()}
    ${fullWidth ? 'w-full flex' : 'inline-flex'}
    ${loading ? 'opacity-75 cursor-wait' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Compute animation variants and states
  const variants = customVariants || (useAnimation ? motionVariants[motionVariant] || {} : {});

  // Compute hover animation
  const computedWhileHover = customHoverAnimation ||
    (whileHoverAnimation ? getVariantVisible(whileHoverAnimation) : { y: -2, scale: 1.02 });

  // Compute tap animation
  const computedWhileTap = customTapAnimation ||
    (whileTapAnimation ? getVariantVisible(whileTapAnimation) : { scale: 0.98 });

  // Compute focus animation
  const computedWhileFocus = customFocusAnimation ||
    (whileFocusAnimation ? getVariantVisible(whileFocusAnimation) : whileFocus);

  const isDisabled = disabled || loading;

  return (
    <motion.button
      className={computedClasses}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      variants={variants}
      initial={useAnimation ? "hidden" : false}
      animate={useAnimation ? "visible" : false}
      transition={customTransition}
      whileHover={isDisabled ? undefined : computedWhileHover}
      whileTap={isDisabled ? undefined : computedWhileTap}
      whileFocus={computedWhileFocus}
      aria-busy={loading}
      {...rest}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
    </motion.button>
  );
};