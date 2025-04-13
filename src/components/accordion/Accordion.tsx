'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps, WithChildren } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'danger' | 'success' | 'info' | 'warning';
type Variant = 'solid' | 'outline' | 'ghost';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps extends BaseProps, WithChildren {
  items: AccordionItem[];
  color?: Color;
  variant?: Variant;
  motionVariant?: keyof typeof motionVariants;
  allowMultipleOpen?: boolean;
  defaultOpenIndex?: number[];
  customIcon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  wrapperClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  className = '',
  items,
  color = 'primary',
  variant = 'solid',
  motionVariant = 'fadeIn',
  allowMultipleOpen = false,
  defaultOpenIndex = [],
  customIcon,
  iconPosition = 'right',
  wrapperClassName = '',
  headerClassName = '',
  contentClassName = '',
  ...rest
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpenIndex);

  const toggleItem = (index: number) => {
    if (allowMultipleOpen) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  const isOpen = (index: number) => openIndexes.includes(index);

  const colorStyles = {
    primary: {
      solid: 'bg-blue-100 border border-blue-400 text-blue-900 hover:bg-blue-200 focus:ring-blue-500',
      outline: 'border border-blue-400 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    },
    secondary: {
      solid: 'bg-gray-100 border border-gray-400 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
      outline: 'border border-gray-400 text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
    },
    danger: {
      solid: 'bg-red-100 border border-red-400 text-red-900 hover:bg-red-200 focus:ring-red-500',
      outline: 'border border-red-400 text-red-600 hover:bg-red-50 focus:ring-red-500',
      ghost: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
    },
    success: {
      solid: 'bg-green-100 border border-green-400 text-green-900 hover:bg-green-200 focus:ring-green-500',
      outline: 'border border-green-400 text-green-600 hover:bg-green-50 focus:ring-green-500',
      ghost: 'text-green-600 hover:bg-green-50 focus:ring-green-500',
    },
    info: {
      solid: 'bg-blue-100 border border-blue-400 text-blue-900 hover:bg-blue-200 focus:ring-blue-400',
      outline: 'border border-blue-400 text-blue-600 hover:bg-blue-50 focus:ring-blue-400',
      ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-400',
    },
    warning: {
      solid: 'bg-yellow-100 border border-yellow-400 text-yellow-900 hover:bg-yellow-200 focus:ring-yellow-500',
      outline: 'border border-yellow-400 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500',
      ghost: 'text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500',
    },
  };

  const variantClasses = colorStyles[color][variant];

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`rounded-md focus:outline-none ${variantClasses} ${wrapperClassName}`}
        >
          <button
            disabled={item.disabled}
            className={`w-full flex justify-between items-center px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses} ${headerClassName}`}
            onClick={() => !item.disabled && toggleItem(index)}
            aria-expanded={isOpen(index)}
          >
            {iconPosition === 'left' && (
              <span className="mr-2">
                {customIcon ?? (
                  <motion.svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    animate={{ rotate: isOpen(index) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                )}
              </span>
            )}
            <span className="flex-1">{item.title}</span>
            {iconPosition === 'right' && (
              <span className="ml-2">
                {customIcon ?? (
                  <motion.svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    animate={{ rotate: isOpen(index) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                )}
              </span>
            )}
          </button>
          <AnimatePresence>
            {isOpen(index) && (
              <motion.div
                variants={motionVariants[motionVariant]}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`px-4 py-2 border-t ${contentClassName}`}
              {...rest}
              >
                {item.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
