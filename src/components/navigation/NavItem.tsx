import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps, WithChildren } from '../../../types/common';

interface NavItemProps extends BaseProps, WithChildren {
  href: string;
  active?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ children, className = '', href, active = false }) => {
  const activeClass = active ? 'text-gray-900 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700';

  return (
    <motion.a
      href={href}
      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${activeClass} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

