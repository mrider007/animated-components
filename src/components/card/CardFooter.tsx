import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps } from '../../../types/common';

export interface CardFooterProps extends BaseProps, Omit<HTMLMotionProps<"div">, "children"> {
  children?: React.ReactNode;
  motionVariant?: keyof typeof motionVariants;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '', motionVariant = 'fadeIn', ...rest }) => {
  return (
    <motion.div
      className={`px-4 py-4 sm:px-6 border-t border-gray-100/50 bg-transparent ${className}`}
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
      exit="hidden"
      {...rest}
    >
      {children}
    </motion.div>
  );
};
