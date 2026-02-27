import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps, RadiusProps } from '../../../types/common';

export type MotionVariantKey = keyof typeof motionVariants;

export interface NavItemProps extends BaseProps, RadiusProps, Omit<HTMLMotionProps<"a">, "children" | "href" | "className"> {
  href: string;
  /** Whether this item is active */
  active?: boolean;
  /** Size key for padding and font size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Customize size classes */
  sizeClasses?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>>;
  motionVariant?: MotionVariantKey;
  duration?: number;
  loop?: boolean;
  /** Text color classes when inactive */
  textColorClass?: string;
  /** Text color classes on hover */
  hoverTextColorClass?: string;
  /** Text color classes when active */
  activeTextColorClass?: string;
  /** Scale on hover */
  hoverScale?: number;
  /** Scale on tap */
  tapScale?: number;
  /** Custom children rendering */
  children?: React.ReactNode;
}

export const NavItem: React.FC<NavItemProps> = ({
  href,
  children,
  className = '',
  active = false,
  size = 'md',
  sizeClasses,
  radius = 'md',
  motionVariant = 'fadeIn',
  duration = 0.3,
  loop = false,
  textColorClass = 'text-gray-500',
  hoverTextColorClass = 'hover:text-gray-900 hover:bg-gray-50/50',
  activeTextColorClass = 'text-blue-600 font-medium',
  hoverScale = 1.02,
  tapScale = 0.98,
  ...rest
}) => {
  const defaultSizeClasses: Record<string, string> = {
    xs: 'text-xs px-2 py-1',
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-2.5',
    xl: 'text-xl px-6 py-3',
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

  const mergedSizeClasses = { ...defaultSizeClasses, ...sizeClasses };
  const baseClasses = `relative inline-flex items-center justify-center transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${mergedSizeClasses[size]} ${getRadiusClasses()}`;
  const stateClasses = active ? activeTextColorClass : `${textColorClass} ${hoverTextColorClass}`;

  const transition = {
    duration,
    ...(loop ? { repeat: Infinity, repeatType: 'loop' as const } : {}),
  };

  return (
    <motion.a
      href={href}
      className={`${baseClasses} ${stateClasses} ${className}`}
      initial="hidden"
      animate="visible"
      variants={motionVariants[motionVariant]}
      transition={transition}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      {active && (
        <motion.div
          layoutId="nav-item-active-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
          initial={false}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </motion.a>
  );
};

