'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { BaseProps } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | string;

export interface BreadcrumbProps extends BaseProps, Omit<HTMLMotionProps<"nav">, "children"> {
  items: { label: string; href: string }[];
  motionVariant?: keyof typeof motionVariants;
  color?: Color;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ className = '', items, motionVariant = 'fadeIn', color = 'primary', ...rest }) => {
  // Color classes for breadcrumb
  const colorClasses: Record<string, string> = {
    primary: 'text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus-visible:ring-blue-500/50',
    secondary: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-500/50',
    success: 'text-green-600 hover:text-green-800 hover:bg-green-50 focus-visible:ring-green-500/50',
    danger: 'text-red-600 hover:text-red-800 hover:bg-red-50 focus-visible:ring-red-500/50',
    warning: 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 focus-visible:ring-yellow-500/50',
    info: 'text-cyan-600 hover:text-cyan-800 hover:bg-cyan-50 focus-visible:ring-cyan-500/50',
  };

  const appliedClass = colorClasses[color] || colorClasses.primary;

  return (
    <motion.nav
      className={`flex ${className}`}
      aria-label="Breadcrumb"
      variants={motionVariants[motionVariant]}
      initial="hidden"
      animate="visible"
      exit="hidden"
      {...rest}
    >
      <ol className="inline-flex items-center space-x-1 sm:space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center group">
              {index > 0 && (
                <svg className="w-4 h-4 text-gray-400 mx-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              <a
                href={isLast ? undefined : item.href}
                aria-current={isLast ? 'page' : undefined}
                className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded-md transition-all duration-200 outline-none focus-visible:ring-2 ${isLast
                    ? 'text-gray-500 cursor-default'
                    : `${appliedClass} active:scale-95`
                  }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
};
