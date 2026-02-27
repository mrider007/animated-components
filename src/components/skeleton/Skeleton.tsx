import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { BaseProps, RadiusProps, Radius, VariantProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'default' | string;
type SkeletonVariant = 'pulse' | 'shimmer' | string;

export interface SkeletonProps extends BaseProps, RadiusProps, Omit<HTMLMotionProps<"div">, "children" | "variant"> {
  width?: string;
  height?: string;
  color?: Color;
  variant?: SkeletonVariant;
  motionVariant?: keyof typeof motionVariants;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = '100%',
  height = '20px',
  color = 'default',
  variant = 'pulse',
  radius = 'md',
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

  const colorClasses: Record<string, string> = {
    default: 'bg-gray-200',
    primary: 'bg-blue-100',
    secondary: 'bg-gray-300',
    success: 'bg-green-100',
    danger: 'bg-red-100',
    warning: 'bg-yellow-100',
    info: 'bg-cyan-100',
  };

  const baseBg = colorClasses[color] || colorClasses.default;
  const isPulse = variant === 'pulse';
  const isShimmer = variant === 'shimmer';

  return (
    <motion.div
      className={`relative overflow-hidden ${getRadiusClasses()} ${baseBg} ${isPulse ? 'animate-pulse' : ''} ${className}`}
      style={{ width, height }}
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
      {...rest}
    >
      {isShimmer && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ translateX: ['-100%', '100%'] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'linear',
          }}
        />
      )}
    </motion.div>
  );
};
