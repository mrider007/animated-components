import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps, WithChildren } from '../../../types/common';

export const TableRow: React.FC<BaseProps & WithChildren> = ({ children, className = '' }) => {
  return (
    <motion.tr
      className={className}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.tr>
  );
};

