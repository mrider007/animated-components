import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { BaseProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

type MotionVariantKey = keyof typeof motionVariants;

export interface ListItemProps extends BaseProps, Omit<HTMLMotionProps<"li">, "children"> {
  children?: React.ReactNode;
  motionVariant?: MotionVariantKey;
}

export const ListItem: React.FC<ListItemProps> = ({
  children,
  className = '',
  motionVariant = 'fadeIn',
  ...rest
}) => {
  return (
    <motion.li
      className={`px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50/80 cursor-default ${className}`}
      initial="hidden"
      animate="visible"
      variants={motionVariants[motionVariant]}
      {...rest}
    >
      {children}
    </motion.li>
  );
};
