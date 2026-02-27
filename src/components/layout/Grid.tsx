import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface GridProps extends BaseProps, Omit<HTMLMotionProps<"div">, "children"> {
  children?: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: number | string;
  motionVariant?: keyof typeof motionVariants;
  duration?: number;
  loop?: boolean;
}

export const Grid: React.FC<GridProps> = ({
  children,
  className = '',
  cols = 3,
  gap = 4,
  duration = 0.3,
  loop = false,
  motionVariant = 'fadeIn',
  ...rest
}) => {
  const transition = {
    duration,
    ...(loop ? { repeat: Infinity, repeatType: 'loop' as const } : {}),
  };

  const colClasses: Record<number, string> = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
    7: 'lg:grid-cols-7',
    8: 'lg:grid-cols-8',
    9: 'lg:grid-cols-9',
    10: 'lg:grid-cols-10',
    11: 'lg:grid-cols-11',
    12: 'lg:grid-cols-12',
  };

  const appliedCols = colClasses[cols] || colClasses[3];

  return (
    <motion.div
      {...rest}
      initial="hidden"
      animate="visible"
      transition={transition}
      variants={motionVariants[motionVariant]}
      className={`grid grid-cols-1 sm:grid-cols-2 ${appliedCols} gap-${gap} ${className}`}
    >
      {children}
    </motion.div>
  );
};

