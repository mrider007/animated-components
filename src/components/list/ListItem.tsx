import React from 'react';
import { motion} from 'framer-motion';
import { BaseProps, WithChildren } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';


type MotionVariantKey = keyof typeof motionVariants;

interface ListItemProps extends BaseProps, WithChildren {
  motionVariant?: MotionVariantKey;
  duration?: number;
  loop?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  children,
  className = '',
  motionVariant = 'fadeIn', 
  duration = 0.3,        
  loop = false,        
  ...rest
}) => {
  const transition = {
    duration,
    ...(loop ? { repeat: Infinity, repeatType: 'loop' } : {}),
  };

  return (
    <motion.li
      className={className}
      initial="hidden"
      animate="visible"
      variants={motionVariants[motionVariant]}
      transition={{transition}}
      {...rest}
    >
      {children}
    </motion.li>
  );
};
