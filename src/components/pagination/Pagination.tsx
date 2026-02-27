import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps, RadiusProps, VariantProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | string;
type PaginationVariant = 'flat' | 'solid' | 'glass' | string;

export interface PaginationProps extends BaseProps, RadiusProps, Omit<HTMLMotionProps<"nav">, "children" | "color" | "className" | "variant"> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  color?: Color;
  variant?: PaginationVariant;
  motionVariant?: keyof typeof motionVariants;
}

export const Pagination: React.FC<PaginationProps> = ({
  className = '',
  currentPage,
  totalPages,
  onPageChange,
  color = 'primary',
  variant = 'flat',
  radius = 'md',
  motionVariant = 'fadeIn',
  ...rest
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getRadiusClasses = () => {
    switch (radius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case 'xl': return 'rounded-xl';
      case '2xl': return 'rounded-2xl';
      case 'full': return 'rounded-full';
      default: return `rounded-${radius}`;
    }
  };

  const colorStyles: Record<string, Record<string, { active: string; default: string; disabled: string }>> = {
    primary: {
      flat: { active: 'bg-blue-100 text-blue-700 border-blue-200', default: 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200', disabled: 'bg-gray-50 text-gray-400 border-gray-200' },
      solid: { active: 'bg-blue-600 text-white shadow-md shadow-blue-500/20 border-blue-600', default: 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200', disabled: 'bg-gray-50 text-gray-400 border-gray-200' },
      glass: { active: 'bg-blue-500/80 backdrop-blur-md text-white border-blue-400/50', default: 'bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white/80 border-white/50', disabled: 'bg-gray-100/50 text-gray-400 border-white/30' },
    },
    // Adding secondary color as a fallback for the mapping below
    secondary: {
      flat: { active: 'bg-gray-200 text-gray-800 border-gray-300', default: 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200', disabled: 'bg-gray-50 text-gray-400 border-gray-200' },
      solid: { active: 'bg-gray-800 text-white shadow-md shadow-gray-500/20 border-gray-800', default: 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200', disabled: 'bg-gray-50 text-gray-400 border-gray-200' },
      glass: { active: 'bg-gray-700/80 backdrop-blur-md text-white border-gray-600/50', default: 'bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white/80 border-white/50', disabled: 'bg-gray-100/50 text-gray-400 border-white/30' },
    }
  };

  const theme = (colorStyles[color] || colorStyles.primary)[variant] || colorStyles.primary.flat;

  // Staggered children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.nav
      className={`flex justify-center ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...rest}
    >
      <ul className="flex items-center gap-1 sm:gap-2">
        {/* Previous Page Button */}
        <motion.li variants={itemVariants}>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className={`flex items-center justify-center px-3 h-9 leading-tight border transition-colors 
              ${getRadiusClasses()} 
              ${currentPage === 1 ? `${theme.disabled} cursor-not-allowed` : theme.default}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </motion.li>

        {/* Page Numbers */}
        {pageNumbers.map((number) => {
          const isActive = currentPage === number;
          return (
            <motion.li key={number} variants={itemVariants}>
              <button
                onClick={() => onPageChange(number)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center justify-center w-9 h-9 text-sm font-medium border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-${color}-400/50
                  ${getRadiusClasses()} 
                  ${isActive ? theme.active : theme.default}`}
              >
                {number}
              </button>
            </motion.li>
          );
        })}

        {/* Next Page Button */}
        <motion.li variants={itemVariants}>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className={`flex items-center justify-center px-3 h-9 leading-tight border transition-colors 
              ${getRadiusClasses()} 
              ${currentPage === totalPages ? `${theme.disabled} cursor-not-allowed` : theme.default}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.li>
      </ul>
    </motion.nav>
  );
};