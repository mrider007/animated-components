import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';

interface FlexProps extends BaseProps, WithChildren {
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
  const flexClass = `
    flex
    ${direction === 'col' ? 'flex-col' : 'flex-row'}
    ${`justify-${justify}`}
    ${`items-${align}`}
    ${wrap ? 'flex-wrap' : 'flex-nowrap'}
  `;
  const transition = {
    duration,
    ...(loop ? { repeat: Infinity, repeatType: 'loop' } : {}),
  };
  return (
    <motion.div variants={motionVariants[motionVariant]} {...rest} initial="hidden"
      animate="visible"
      transition={{ transition }} className={`${flexClass} ${className}`}>
      {children}
    </motion.div>
  );
};

