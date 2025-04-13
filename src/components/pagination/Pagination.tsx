'use client';

import React, { useEffect, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { getVariantVisible, motionVariants } from '../../utils/motionVariants';
import { BaseProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface PaginationMotionProps extends Omit<HTMLMotionProps<'nav'>, 'color'> {}

interface PaginationProps extends BaseProps, PaginationMotionProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  color?: Color;
  motionVariant?: keyof typeof motionVariants;
  whileHoverAnimation?: keyof typeof motionVariants;
  whileTapAnimation?: keyof typeof motionVariants;
  whileFocusAnimation?: keyof typeof motionVariants;
}

export const Pagination: React.FC<PaginationProps> = ({
  className = '',
  currentPage,
  totalPages,
  onPageChange,
  color = 'primary',
  motionVariant = 'fadeIn',
  whileHoverAnimation,
  whileTapAnimation,
  whileFocusAnimation,
  whileHover,
  whileTap,
  whileFocus,
  ...rest
}) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [visiblePages, setVisiblePages] = useState<(number | string)[]>([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const generateVisiblePages = () => {
      const maxMobilePages = 3;
      const maxDesktopPages = 5;
      const maxVisible = windowWidth < 768 ? maxMobilePages : maxDesktopPages;
      
      if (totalPages <= maxVisible + 2) return Array.from({ length: totalPages }, (_, i) => i + 1);

      const startPage = Math.max(2, currentPage - Math.floor(maxVisible / 2));
      const endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxVisible / 2));

      let pages: (number | string)[] = [1];

      if (startPage > 2) pages.push('...');
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);

      return pages;
    };

    setVisiblePages(generateVisiblePages());
  }, [currentPage, totalPages, windowWidth]);

  const colorClasses: Record<Color, string> = {
    primary: 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800',
    secondary: 'text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600',
    success: 'text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700 dark:bg-green-800 dark:hover:bg-green-700',
    danger: 'text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 dark:bg-red-800 dark:hover:bg-red-700',
    warning: 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100 hover:text-yellow-700 dark:bg-yellow-800 dark:hover:bg-yellow-700',
    info: 'text-blue-400 bg-blue-50 hover:bg-blue-100 hover:text-blue-500 dark:bg-blue-800 dark:hover:bg-blue-700',
  };

   const computedWhileHover = whileHoverAnimation 
      ? getVariantVisible(whileHoverAnimation)
      : whileHover;
    
    const computedWhileTap = whileTapAnimation 
      ? getVariantVisible(whileTapAnimation)
      : whileTap;
    
    const computedWhileFocus = whileFocusAnimation 
      ? getVariantVisible(whileFocusAnimation)
      : whileFocus;

  return (
    <motion.nav
      className={`flex justify-center ${className}`}
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
      {...rest}
    >
      <div className="w-full overflow-x-auto">
        <ul className="flex items-center -space-x-px h-10">
          {/* Previous Button */}
          <li className="flex-shrink-0">
            <motion.button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base 
                border border-gray-300 rounded-l-lg transition-colors duration-200
                ${colorClasses[color]} 
                ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
              whileHover={computedWhileHover}
              whileTap={computedWhileTap}
              whileFocus={computedWhileFocus}
            >
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </motion.button>
          </li>

          {/* Page Number Buttons */}
          {visiblePages.map((page, index) => (
            <li key={`${page}-${index}`} className="flex-shrink-0">
              {page === '...' ? (
                <span className="px-3 py-2 text-gray-500 border border-gray-300 bg-white dark:bg-gray-800">
                  ...
                </span>
              ) : (
                <motion.button
                  onClick={() => onPageChange(page as number)}
                  className={`min-w-[40px] px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base 
                    border border-gray-300 transition-colors duration-200
                    ${
                      currentPage === page
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-100'
                        : 'bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
                    }`}
                  whileHover={computedWhileHover}
                  whileTap={computedWhileTap}
                  whileFocus={computedWhileFocus}
                >
                  {page}
                </motion.button>
              )}
            </li>
          ))}

          {/* Next Button */}
          <li className="flex-shrink-0">
            <motion.button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base 
                border border-gray-300 rounded-r-lg transition-colors duration-200
                ${colorClasses[color]} 
                ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
              whileHover={computedWhileHover}
              whileTap={computedWhileTap}
              whileFocus={computedWhileFocus}
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
            </motion.button>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};