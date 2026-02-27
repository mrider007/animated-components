import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps } from '../../../types/common';

export interface FlexProps extends BaseProps, Omit<HTMLMotionProps<"div">, "children" | "direction"> {
  children?: React.ReactNode;
  direction?: 'row' | 'col';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch';
  wrap?: boolean;
  motionVariant?: keyof typeof motionVariants;
  duration?: number;
  loop?: boolean;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  className = '',
  direction = 'row',
  justify = 'start',
  align = 'start',
  wrap = false,
  motionVariant = 'fadeIn',
  duration = 0.3,
  loop = false,
  ...rest
}) => {
  const flexClass = [
    'flex',
    direction === 'col' ? 'flex-col' : 'flex-row',
    `justify-${justify}`,
    `items-${align}`,
    wrap ? 'flex-wrap' : 'flex-nowrap'
  ].filter(Boolean).join(' ');

  const transition = {
    duration,
    ...(loop ? { repeat: Infinity, repeatType: 'loop' as const } : {}),
  };

  return (
    <motion.div
      {...rest}
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
      transition={transition}
      className={`${flexClass} ${className}`}
    >
      {children}
    </motion.div>
  );
};

