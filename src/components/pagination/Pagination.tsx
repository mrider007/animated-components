import React, { HTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type PaginationSize = 'sm' | 'md' | 'lg';

interface PaginationProps extends BaseProps, HTMLMotionProps<'nav'> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  color?: Color;
  size?: PaginationSize;
  motionVariant?: keyof typeof motionVariants;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  showPageNumbers?: boolean;
  previousLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
  firstLabel?: React.ReactNode;
  lastLabel?: React.ReactNode;
  buttonProps?: HTMLMotionProps<'button'>;
  activeButtonProps?: HTMLMotionProps<'button'>;
  disabledButtonProps?: HTMLMotionProps<'button'>;
}

export const Pagination: React.FC<PaginationProps> = ({
  className = '',
  currentPage,
  totalPages,
  onPageChange,
  color = 'primary',
  size = 'md',
  motionVariant = 'fadeIn',
  showFirstLast = false,
  maxVisiblePages = 5,
  showPageNumbers = true,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  firstLabel = '«',
  lastLabel = '»',
  buttonProps = {},
  activeButtonProps = {},
  disabledButtonProps = {},
  ...restProps
}) => {
  // Generate array of page numbers to display
  const getPageRange = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate the range to show
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    // Adjust if end page exceeds total pages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const pageNumbers = getPageRange();

  // Color classes for different states
  const colorClasses = {
    primary: 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700',
    secondary: 'text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-700',
    success: 'text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700',
    danger: 'text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700',
    warning: 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100 hover:text-yellow-700',
    info: 'text-blue-400 bg-blue-50 hover:bg-blue-100 hover:text-blue-500',
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  // Active page classes
  const activeClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
    info: 'bg-blue-500 text-white hover:bg-blue-600',
  };

  // Base button classes
  const baseButtonClasses = `
    border border-gray-300
    transition-colors duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    ${sizeClasses[size]}
  `;

  return (
    <motion.nav
      className={`flex flex-wrap justify-center ${className}`}
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, staggerChildren: 0.05 }}
      {...restProps}
    >
      <ul className="flex flex-wrap items-center space-x-1 md:space-x-2">
        {/* First Page Button */}
        {showFirstLast && (
          <li>
            <motion.button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className={`
                ${baseButtonClasses}
                ${colorClasses[color]}
                rounded-l-lg md:rounded-lg
                ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}
              `}
              variants={motionVariants[motionVariant]}
              initial="hidden"
              animate="visible"
              {...buttonProps}
              {...(currentPage === 1 ? disabledButtonProps : {})}
              aria-label="Go to first page"
            >
              {firstLabel}
            </motion.button>
          </li>
        )}

        {/* Previous Page Button */}
        <li>
          <motion.button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`
              ${baseButtonClasses}
              ${colorClasses[color]}
              ${!showFirstLast ? 'rounded-l-lg' : ''}
              ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}
              hidden sm:block
            `}
            variants={motionVariants[motionVariant]}
            initial="hidden"
            animate="visible"
            {...buttonProps}
            {...(currentPage === 1 ? disabledButtonProps : {})}
            aria-label="Go to previous page"
          >
            {previousLabel}
          </motion.button>
          
          {/* Mobile previous button */}
          <motion.button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`
              ${baseButtonClasses}
              ${colorClasses[color]}
              ${!showFirstLast ? 'rounded-l-lg' : ''}
              ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}
              sm:hidden
            `}
            variants={motionVariants[motionVariant]}
            initial="hidden"
            animate="visible"
            {...buttonProps}
            {...(currentPage === 1 ? disabledButtonProps : {})}
            aria-label="Go to previous page"
          >
            &lt;
          </motion.button>
        </li>

        {/* Page Numbers */}
        {showPageNumbers && pageNumbers.map((number) => (
          <li key={number} className="hidden sm:block">
            <motion.button
              onClick={() => onPageChange(number)}
              className={`
                ${baseButtonClasses}
                ${currentPage === number ? activeClasses[color] : colorClasses[color]}
              `}
              variants={motionVariants[motionVariant]}
              initial="hidden"
              animate="visible"
              {...buttonProps}
              {...(currentPage === number ? activeButtonProps : {})}
              aria-label={`Page ${number}`}
              aria-current={currentPage === number ? 'page' : undefined}
            >
              {number}
            </motion.button>
          </li>
        ))}

        {/* Current page indicator for mobile */}
        <li className="block sm:hidden">
          <motion.span
            className={`
              ${baseButtonClasses}
              ${activeClasses[color]}
              flex items-center justify-center
            `}
            variants={motionVariants[motionVariant]}
            initial="hidden"
            animate="visible"
          >
            {currentPage} / {totalPages}
          </motion.span>
        </li>

        {/* Next Page Button */}
        <li>
          <motion.button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`
              ${baseButtonClasses}
              ${colorClasses[color]}
              ${!showFirstLast ? 'rounded-r-lg' : ''}
              ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}
              hidden sm:block
            `}
            variants={motionVariants[motionVariant]}
            initial="hidden"
            animate="visible"
            {...buttonProps}
            {...(currentPage === totalPages ? disabledButtonProps : {})}
            aria-label="Go to next page"
          >
            {nextLabel}
          </motion.button>
          
          {/* Mobile next button */}
          <motion.button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`
              ${baseButtonClasses}
              ${colorClasses[color]}
              ${!showFirstLast ? 'rounded-r-lg' : ''}
              ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}
              sm:hidden
            `}
            variants={motionVariants[motionVariant]}
            initial="hidden"
            animate="visible"
            {...buttonProps}
            {...(currentPage === totalPages ? disabledButtonProps : {})}
            aria-label="Go to next page"
          >
            &gt;
          </motion.button>
        </li>

        {/* Last Page Button */}
        {showFirstLast && (
          <li>
            <motion.button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`
                ${baseButtonClasses}
                ${colorClasses[color]}
                rounded-r-lg md:rounded-lg
                ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}
              `}
              variants={motionVariants[motionVariant]}
              initial="hidden"
              animate="visible"
              {...buttonProps}
              {...(currentPage === totalPages ? disabledButtonProps : {})}
              aria-label="Go to last page"
            >
              {lastLabel}
            </motion.button>
          </li>
        )}
      </ul>
    </motion.nav>
  );
};