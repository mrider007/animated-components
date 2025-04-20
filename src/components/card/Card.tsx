import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants'; 
import { BaseProps, WithChildren } from '../../../types/common';

interface CardProps extends BaseProps, WithChildren {
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
}

export const Card: React.FC<CardProps> = ({ children, className = '', motionVariant = 'fadeIn',...rest }) => {
  return (
    <motion.div
      className={`bg-white shadow rounded-lg overflow-hidden ${className}`}
      variants={motionVariants[motionVariant]} // Apply motion variant here
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
