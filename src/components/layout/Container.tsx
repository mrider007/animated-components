import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps } from '../../../types/common';

export interface ContainerProps extends BaseProps, Omit<HTMLMotionProps<"div">, "children"> {
  children?: React.ReactNode;
  fluid?: boolean;
  motionVariant?: keyof typeof motionVariants;
  duration?: number;
  loop?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  fluid = false,
  motionVariant = 'fadeIn',
  duration = 0.3,
  loop = false,
  ...rest
}) => {
  const containerClass = fluid ? 'w-full px-4 sm:px-6 lg:px-8' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

  const transition = {
    duration,
    ...(loop ? { repeat: Infinity, repeatType: 'loop' as const } : {}),
  };

  return (
    <motion.div
      {...rest}
      className={`${containerClass} ${className}`}
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
      transition={transition}
    >
      {children}
    </motion.div>
  );
};
