import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { BaseProps, RadiusProps, Radius, VariantProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

type ListVariant = 'flat' | 'elevated' | 'glass' | 'ghost' | string;

// Omit variant to prevent interface collision with common VariantProps
export interface ListProps extends BaseProps, RadiusProps, Omit<HTMLMotionProps<"ul">, "children" | "variant"> {
  children?: React.ReactNode;
  as?: 'ul' | 'ol';
  motionVariant?: keyof typeof motionVariants;
  variant?: ListVariant;
}

export const List: React.FC<ListProps> = ({
  children,
  className = '',
  as = 'ul',
  motionVariant = 'fadeIn',
  variant = 'flat',
  radius = 'lg',
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

  const getVariantClasses = () => {
    switch (variant) {
      case 'flat': return 'bg-white border border-gray-200';
      case 'elevated': return 'bg-white shadow-lg shadow-gray-200/50 border border-gray-100';
      case 'glass': return 'bg-white/70 backdrop-blur-md border border-white/40 shadow-xl shadow-gray-200/30';
      case 'ghost': return 'bg-transparent';
      default: return 'bg-white border border-gray-200';
    }
  };

  const MotionTag = (as === 'ol' ? motion.ol : motion.ul) as React.ElementType;

  return (
    <MotionTag
      className={`overflow-hidden divide-y divide-gray-100 ${getVariantClasses()} ${getRadiusClasses()} ${className}`}
      initial="hidden"
      animate="visible"
      variants={motionVariants[motionVariant]}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

