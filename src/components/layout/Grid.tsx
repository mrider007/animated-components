import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';
import { motion } from 'framer-motion'

interface GridProps extends BaseProps, WithChildren {
  cols?: number;
  gap?: number;
  motionVariant?: keyof typeof motionVariants;
  duration?: number;
  loop?: boolean;
}

export const Grid: React.FC<GridProps> = ({ children, className = '', cols = 3, gap = 4, duration = 0.3,
  loop = false, motionVariant = 'fadeIn', ...rest }) => {
    const transition = {
      duration,
      ...(loop ? { repeat: Infinity, repeatType: 'loop' } : {}),
    };
  return (
    <motion.div {...rest} initial="hidden"
      animate="visible"
      transition={{ transition }} variants={motionVariants[motionVariant]} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cols} gap-${gap} ${className}`}>
      {children}
    </motion.div>
  );
};

