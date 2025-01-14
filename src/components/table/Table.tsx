import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps, WithChildren } from '../../../types/common';

export const Table: React.FC<BaseProps & WithChildren> = ({ children, className = '' }) => {
  return (
    <motion.div
      className="overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        {children}
      </table>
    </motion.div>
  );
};

