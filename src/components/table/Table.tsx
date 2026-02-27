'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps, SizeProps, RadiusProps, VariantProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | string;
type TableVariant = 'flat' | 'elevated' | 'glass' | string;

export interface TableProps extends BaseProps, SizeProps, RadiusProps, Omit<HTMLMotionProps<"div">, "children" | "color" | "variant"> {
  children?: React.ReactNode;
  /** Predefined motion variant */
  motionVariant?: keyof typeof motionVariants;
  /** Color theme */
  color?: Color;
  /** Visual variant */
  variant?: TableVariant;
  /** Striped rows */
  striped?: boolean;
  /** Hoverable rows */
  hoverable?: boolean;
  /** Show borders */
  bordered?: boolean;
  /** Whether to animate on mount */
  useAnimation?: boolean;
}

export const Table: React.FC<TableProps> = ({
  children,
  className = '',
  motionVariant = 'fadeIn',
  color = 'primary',
  variant = 'flat',
  radius = 'lg',
  striped = false,
  hoverable = true,
  bordered = false,
  useAnimation = true,
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

  const variantClasses: Record<string, string> = {
    flat: 'bg-white border border-gray-100',
    elevated: 'bg-white shadow-lg shadow-gray-200/50 border border-gray-50',
    glass: 'bg-white/60 backdrop-blur-md border border-white/50 shadow-xl shadow-gray-200/30',
  };

  const colorStyles: Record<string, string> = {
    primary: '[&_thead]:bg-blue-50/50 [&_thead_th]:text-blue-700',
    secondary: '[&_thead]:bg-gray-50/50 [&_thead_th]:text-gray-700',
    success: '[&_thead]:bg-green-50/50 [&_thead_th]:text-green-700',
    danger: '[&_thead]:bg-red-50/50 [&_thead_th]:text-red-700',
    warning: '[&_thead]:bg-yellow-50/50 [&_thead_th]:text-yellow-700',
    info: '[&_thead]:bg-cyan-50/50 [&_thead_th]:text-cyan-700',
  };

  const appliedVariant = variantClasses[variant] || variantClasses.flat;
  const appliedColor = colorStyles[color] || colorStyles.primary;

  const tableClasses = [
    'min-w-full divide-y divide-gray-100 text-sm text-left',
    striped ? '[&_tbody_tr:nth-child(even)]:bg-gray-50/50' : '',
    hoverable ? '[&_tbody_tr]:hover:bg-gray-50/80 [&_tbody_tr]:transition-colors [&_tbody_tr]:duration-200 cursor-default' : '',
    bordered ? '[&_th]:border-r [&_th]:border-b [&_td]:border-r [&_td]:border-b last:[&_th]:border-r-0 last:[&_td]:border-r-0 border-gray-100' : '[&_tbody_tr]:border-b [&_tbody_tr:last-child]:border-0 border-gray-100',
    appliedColor
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      className={`overflow-hidden overflow-x-auto ${getRadiusClasses()} ${appliedVariant} ${className}`}
      variants={motionVariants[motionVariant]}
      initial={useAnimation ? "hidden" : false}
      animate={useAnimation ? "visible" : false}
      {...rest}
    >
      <table className={tableClasses}>
        {children}
      </table>
    </motion.div>
  );
};
