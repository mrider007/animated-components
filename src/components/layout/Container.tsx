import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants'; // Ensure motionVariants is defined
import { BaseProps, WithChildren } from '../../../types/common';

interface ContainerProps extends BaseProps, WithChildren {
  fluid?: boolean;
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
  duration?: number;
  loop?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '', fluid = false, motionVariant = 'fadeIn',duration = 0.3,
  loop = false, ...rest }) => {
  const containerClass = fluid ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
  const transition = {
    duration,
    ...(loop ? { repeat: Infinity, repeatType: 'loop' } : {}),
  };


  return (
    <motion.div
      className={`${containerClass} ${className}`}
      variants={motionVariants[motionVariant]}
      {...rest} 
      initial="hidden"
      animate="visible"
      transition={{ transition }}
    >
      {children}
    </motion.div>
  );
};
