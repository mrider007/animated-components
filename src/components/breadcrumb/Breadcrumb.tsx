'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

interface BreadcrumbProps extends BaseProps {
  items: { label: string; href: string }[];
  motionVariant?: keyof typeof motionVariants; // Allow motion variant selection
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ className = '', items, motionVariant = 'fadeIn' }) => {
  return (
    <motion.nav
      className={`flex ${className}`}
      aria-label="Breadcrumb"
      variants={motionVariants[motionVariant]} // Apply motion variant here
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3 }}
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <a
              href={item.href}
              className={`ml-1 text-sm font-medium ${
                index === items.length - 1
                  ? 'text-gray-500 hover:text-gray-700'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </motion.nav>
  );
};
