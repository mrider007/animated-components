import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { BaseProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

export interface TableRowProps extends BaseProps, Omit<HTMLMotionProps<"tr">, "children"> {
  children?: React.ReactNode;
  motionVariant?: keyof typeof motionVariants;
  isHeader?: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  className = '',
  motionVariant = 'fadeIn',
  isHeader = false,
  ...rest
}) => {
  return (
    <motion.tr
      className={`${isHeader ? '' : 'group'} ${className}`}
      variants={motionVariants[motionVariant]}
      {...rest}
    >
      {children}
    </motion.tr>
  );
};

