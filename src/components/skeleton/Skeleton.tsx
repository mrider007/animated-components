import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface SkeletonProps extends BaseProps {
  width?: string;
  height?: string;
  color?: Color;
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = '100%',
  height = '20px',
  color = 'primary',
  motionVariant = 'fadeIn', // Default motion variant
}) => {
  const colorClasses = {
    primary: 'bg-blue-200',
    secondary: 'bg-gray-300',
    success: 'bg-green-200',
    danger: 'bg-red-200',
    warning: 'bg-yellow-200',
    info: 'bg-indigo-200',
  };

  return (
    <motion.div
      className={`animate-pulse rounded ${colorClasses[color]} ${className}`}
      style={{ width, height }}
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
    ></motion.div>
  );
};
