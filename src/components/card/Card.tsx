import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps, RadiusProps, Radius, VariantProps } from '../../../types/common';

export interface CardProps extends BaseProps, RadiusProps, VariantProps, Omit<HTMLMotionProps<"div">, "children"> {
  children?: React.ReactNode;
  motionVariant?: keyof typeof motionVariants;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  motionVariant = 'fadeIn',
  variant = 'elevated',
  radius = 'xl',
  hoverable = false,
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

  const variantClasses = {
    flat: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg shadow-gray-200/50 border border-gray-100',
    glass: 'bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl shadow-gray-200/30',
  };

  const hoverClasses = hoverable
    ? 'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-300/50 cursor-pointer'
    : '';

  return (
    <motion.div
      className={`overflow-hidden ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.elevated} ${getRadiusClasses()} ${hoverClasses} ${className}`}
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
      exit="hidden"
      // Avoid overriding exit transitions defined in variants unless explicitly desired
      {...rest}
    >
      {children}
    </motion.div>
  );
};
