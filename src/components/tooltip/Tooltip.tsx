'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants'; 
import { BaseProps, WithChildren } from '../../../types/common';

type TooltipColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface TooltipProps extends BaseProps, WithChildren {
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  color?: TooltipColor;
  motionVariant?: keyof typeof motionVariants;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  className = '',
  content,
  position = 'top',
  color = 'primary',
  motionVariant = 'fadeIn', 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  };

  const colorClasses = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-500',
    info: 'bg-blue-400',
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute z-10 px-3 py-2 text-sm font-medium text-white rounded-lg shadow-sm ${positionClasses[position]} ${colorClasses[color]} ${className}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            variants={motionVariants[motionVariant]}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
