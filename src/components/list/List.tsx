import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps, WithChildren } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

interface ListProps extends BaseProps, WithChildren {
  as?: 'ul' | 'ol';
  motionVariant?: keyof typeof motionVariants;
  duration?: number;
  loop?: boolean;
}

export const List: React.FC<ListProps> = ({ children, className = '', duration = 0.3,
  loop = false, as = 'ul', motionVariant = 'fadeIn', ...rest }) => {
  const transition = {
    duration,
    ...(loop ? { repeat: Infinity, repeatType: 'loop' } : {}),
  };
  const Tag = as;
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={motionVariants[motionVariant]}
      transition={{ transition }}
      {...rest}
    >
      <Tag className={`space-y-1 ${className}`}>
        {children}
      </Tag>
    </motion.div>
  );
};

