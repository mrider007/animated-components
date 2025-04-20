import React from 'react';
import { motion, HTMLMotionProps, Variants, Transition } from 'framer-motion';
import { motionVariants, getVariantVisible } from '../../utils/motionVariants';
import { BaseProps, SizeProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | string;
type ButtonVariant = 'solid' | 'outline' | 'ghost' | string;
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
type MotionVariantKey = keyof typeof motionVariants;

interface ButtonProps extends BaseProps, SizeProps, HTMLMotionProps<'button'> {
  /**
   * Visual style of the button
   * @default 'solid'
   */
  variant?: ButtonVariant;
  
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
  ...rest
}) => {
  // Default base classes if not unstyled and no custom base class provided
  const defaultBaseClasses = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Use either provided base class, default base class, or none if unstyled
  const baseClasses = unstyled ? '' : (baseClassName || defaultBaseClasses);

  // Default color classes for different variants
  const defaultColorClasses: Record<Color, Record<ButtonVariant, string>> = {
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

  // Default size classes
  const defaultSizeClasses: Record<Size, string> = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-2 text-lg',
    xl: 'px-6 py-3 text-xl',
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
    ${getStateClasses()}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Compute animation variants and states
  const variants = customVariants || (useAnimation ? motionVariants[motionVariant] || {} : {});
  
  // Compute hover animation
  const computedWhileHover = customHoverAnimation || 
    (whileHoverAnimation ? getVariantVisible(whileHoverAnimation) : whileHover);
  
  // Compute tap animation
  const computedWhileTap = customTapAnimation || 
    (whileTapAnimation ? getVariantVisible(whileTapAnimation) : whileTap);
  
  // Compute focus animation
  const computedWhileFocus = customFocusAnimation || 
    (whileFocusAnimation ? getVariantVisible(whileFocusAnimation) : whileFocus);

  return (
    <motion.button
      className={computedClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      variants={variants}
      initial={useAnimation ? "hidden" : false}
      animate={useAnimation ? "visible" : false}
      transition={customTransition}
      whileHover={computedWhileHover}
      whileTap={computedWhileTap}
      whileFocus={computedWhileFocus}
      {...rest}
    >
      {children}
    </motion.button>
  );
};