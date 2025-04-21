import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface PaginationProps extends BaseProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  color?: Color;
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
}

export const Pagination: React.FC<PaginationProps> = ({
  className = '',
  currentPage,
  totalPages,
  onPageChange,
  color = 'primary',
  motionVariant = 'fadeIn', // Default motion variant
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const colorClasses = {
    primary: 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700',
    secondary: 'text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-700',
    success: 'text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700',
    danger: 'text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700',
    warning: 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100 hover:text-yellow-700',
    info: 'text-blue-400 bg-blue-50 hover:bg-blue-100 hover:text-blue-500',
  };

  return (
    <motion.nav
      className={`flex justify-center ${className}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      variants={motionVariants[motionVariant]}
    >
      <ul className="flex items-center -space-x-px">
        {/* Previous Page Button */}
        <li>
          <motion.button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`block px-3 py-2 ml-0 leading-tight border border-gray-300 rounded-l-lg ${colorClasses[color]} ${currentPage === 1 && 'cursor-not-allowed opacity-50'}`}
            variants={motionVariants[motionVariant]}
            initial="hidden"
            animate="visible"
          >
            Previous
          </motion.button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <li key={number}>
            <motion.button
              onClick={() => onPageChange(number)}
              className={`px-3 py-2 leading-tight border border-gray-300 ${colorClasses[color]} ${
                currentPage === number
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  : 'bg-white hover:bg-gray-100'
              }`}
              variants={motionVariants[motionVariant]}
              initial="hidden"
              animate="visible"
            >
              {number}
            </motion.button>
          </li>
        ))}

        {/* Next Page Button */}
        <li>
          <motion.button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`block px-3 py-2 leading-tight border border-gray-300 rounded-r-lg ${colorClasses[color]} ${currentPage === totalPages && 'cursor-not-allowed opacity-50'}`}
            variants={motionVariants[motionVariant]}
            initial="hidden"
            animate="visible"
          >
            Next
          </motion.button>
        </li>
      </ul>
    </motion.nav>
  );
};