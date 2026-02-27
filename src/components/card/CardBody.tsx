import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps } from '../../../types/common';

export interface CardBodyProps extends BaseProps, Omit<HTMLMotionProps<"div">, "children"> {
  children?: React.ReactNode;
  motionVariant?: keyof typeof motionVariants;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '', motionVariant = 'fadeIn', ...rest }) => {
  return (
    <motion.div
      className={`px-4 py-5 sm:p-6 text-gray-700 ${className}`}
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
