import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps, WithChildren } from '../../../types/common';

/**
 * A fully customizable navigation link with motion and style props.
 */
export type MotionVariantKey = keyof typeof motionVariants;

export interface NavItemProps extends BaseProps, WithChildren {
  /** Link destination */
  href: string;
  /** Whether this item is active */
  active?: boolean;
  /** Size key for padding and font size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Customize size classes */
  sizeClasses?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>>;
  /** Motion variant key */
  motionVariant?: MotionVariantKey;
  /** Animation duration override (seconds) */
  duration?: number;
  /** Loop the animation */
  loop?: boolean;
  /** Text color classes when inactive */
  textColorClass?: string;
  /** Text color classes on hover */
  hoverTextColorClass?: string;
  /** Text color classes when active */
  activeTextColorClass?: string;
  /** Border classes when active */
  activeBorderClass?: string;
  /** Scale on hover */
  hoverScale?: number;
  /** Scale on tap */
  tapScale?: number;
}

export const NavItem: React.FC<NavItemProps> = ({
  href,
  children,
  className = '',
  active = false,
  size = 'md',
  sizeClasses,
  motionVariant = 'fadeIn',
  duration = 0.3,
  loop = false,
  textColorClass = 'text-gray-500',
  hoverTextColorClass = 'hover:text-gray-700',
  activeTextColorClass = 'text-gray-900',
  activeBorderClass = 'border-b-2 border-blue-500',
  hoverScale = 1.05,
  tapScale = 0.95,
  ...rest
}) => {
  // default size class map
  const defaultSizeClasses: Record<string, string> = {
    xs: 'text-xs px-1 py-0.5',
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-3',
    xl: 'text-xl px-5 py-4',
  };

  // merged size classes
  const mergedSizeClasses = {
    ...defaultSizeClasses,
    ...sizeClasses,
  };

  const baseClasses = `inline-flex items-center ${mergedSizeClasses[size]}`;
  const stateClasses = active
    ? `${activeTextColorClass} ${activeBorderClass}`
    : `${textColorClass} ${hoverTextColorClass}`;

  const transition = {
    duration,
    ...(loop ? { repeat: Infinity, repeatType: 'loop' } : {}),
  };

  return (
    <motion.a
      href={href}
      className={`${baseClasses} ${stateClasses} ${className}`}
      initial="hidden"
      animate="visible"
      variants={motionVariants[motionVariant]}
      transition={{transition}}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      {...rest}
    >
      {children}
    </motion.a>
  );
};
