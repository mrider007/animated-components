import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps, WithChildren } from '../../../types/common';

interface NavbarProps extends BaseProps, WithChildren {
  brand?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ children, className = '', brand }) => {
  return (
    <motion.nav
      className={`bg-white shadow ${className}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            {brand}
          </div>
          <div className="flex items-center">
            {children}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

