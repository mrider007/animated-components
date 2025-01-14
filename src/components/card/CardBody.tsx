import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants'; 
import { BaseProps, WithChildren } from '../../../types/common';

interface CardBodyProps extends BaseProps, WithChildren {
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '', motionVariant = 'fadeIn' }) => {
  return (
    <motion.div
      className={`px-4 py-5 sm:p-6 ${className}`}
      variants={motionVariants[motionVariant]} // Apply motion variant here
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
