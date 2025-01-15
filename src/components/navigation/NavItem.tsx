import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';  // Assuming you have a motionVariants file
import { BaseProps, WithChildren } from '../../../types/common';

interface NavItemProps extends BaseProps, WithChildren {
  href: string;
  active?: boolean;
  size?: 'sm' | 'md' | 'lg'; // Added size for customization
  motionVariant?: keyof typeof motionVariants; // Added motion variant customization
}

export const NavItem: React.FC<NavItemProps> = ({
  children,
  className = '',
  href,
  active = false,
  size = 'md',
  motionVariant = 'fadeIn', 
}) => {
  const activeClass = active ? 'text-gray-900 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700';

  const sizeClasses = {
    xs: 'text-xs px-1 py-0.5',
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-3',
    xl: 'text-xl px-5 py-4',
  };
  

  return (
    <motion.a
      href={href}
      className={`inline-flex items-center ${sizeClasses[size]} ${activeClass} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={motionVariants[motionVariant]} // Applying motion variant
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.a>
  );
};
