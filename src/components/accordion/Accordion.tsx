'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps, RadiusProps, Radius, VariantProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'danger' | 'success' | 'info' | 'warning' | string;
type AccordionVariant = 'solid' | 'outline' | 'ghost' | 'glass' | 'elevated' | string;

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends BaseProps, RadiusProps {
  items: AccordionItem[];
  color?: Color;
  variant?: AccordionVariant;
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
  variant = 'elevated',
  radius = 'lg',
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

  const colorStyles: Record<string, Record<string, string>> = {
    primary: {
      solid: 'bg-blue-50 border border-blue-200 text-blue-900',
      outline: 'border border-blue-300 text-blue-700 bg-transparent',
      ghost: 'text-blue-700 bg-transparent hover:bg-blue-50/50',
      glass: 'bg-blue-50/40 backdrop-blur-md border border-blue-200/50 text-blue-900',
      elevated: 'bg-white border border-gray-100 shadow-md shadow-gray-200/50 text-gray-800',
    },
    secondary: {
      solid: 'bg-gray-50 border border-gray-200 text-gray-900',
      outline: 'border border-gray-300 text-gray-700 bg-transparent',
      ghost: 'text-gray-700 bg-transparent hover:bg-gray-50/50',
      glass: 'bg-gray-50/40 backdrop-blur-md border border-gray-200/50 text-gray-900',
      elevated: 'bg-white border border-gray-100 shadow-md shadow-gray-200/50 text-gray-800',
    },
    danger: {
      solid: 'bg-red-50 border border-red-200 text-red-900',
      outline: 'border border-red-300 text-red-700 bg-transparent',
      ghost: 'text-red-700 bg-transparent hover:bg-red-50/50',
      glass: 'bg-red-50/40 backdrop-blur-md border border-red-200/50 text-red-900',
      elevated: 'bg-white border border-gray-100 shadow-md shadow-gray-200/50 text-gray-800',
    },
    success: {
      solid: 'bg-green-50 border border-green-200 text-green-900',
      outline: 'border border-green-300 text-green-700 bg-transparent',
      ghost: 'text-green-700 bg-transparent hover:bg-green-50/50',
      glass: 'bg-green-50/40 backdrop-blur-md border border-green-200/50 text-green-900',
      elevated: 'bg-white border border-gray-100 shadow-md shadow-gray-200/50 text-gray-800',
    },
    info: {
      solid: 'bg-cyan-50 border border-cyan-200 text-cyan-900',
      outline: 'border border-cyan-300 text-cyan-700 bg-transparent',
      ghost: 'text-cyan-700 bg-transparent hover:bg-cyan-50/50',
      glass: 'bg-cyan-50/40 backdrop-blur-md border border-cyan-200/50 text-cyan-900',
      elevated: 'bg-white border border-gray-100 shadow-md shadow-gray-200/50 text-gray-800',
    },
    warning: {
      solid: 'bg-yellow-50 border border-yellow-200 text-yellow-900',
      outline: 'border border-yellow-300 text-yellow-700 bg-transparent',
      ghost: 'text-yellow-700 bg-transparent hover:bg-yellow-50/50',
      glass: 'bg-yellow-50/40 backdrop-blur-md border border-yellow-200/50 text-yellow-900',
      elevated: 'bg-white border border-gray-100 shadow-md shadow-gray-200/50 text-gray-800',
    },
  };

  const getRadiusClasses = () => {
    switch (radius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case 'xl': return 'rounded-xl';
      case '2xl': return 'rounded-2xl';
      case 'full': return 'rounded-3xl';
      default: return `rounded-${radius}`;
    }
  };

  const variantClasses = (colorStyles[color] || colorStyles.primary)[variant] || colorStyles.primary.elevated;

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`overflow-hidden transition-colors duration-300 ease-out focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-${color}-400/50 ${getRadiusClasses()} ${variantClasses} ${wrapperClassName}`}
        >
          <button
            disabled={item.disabled}
            className={`w-full flex justify-between items-center px-5 py-3 text-left font-medium outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isOpen(index) ? 'bg-black/5' : 'hover:bg-black/5'} ${headerClassName}`}
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
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                className={`overflow-hidden`}
              >
                <div className={`px-5 py-4 text-sm opacity-90 border-t border-black/5 ${contentClassName}`} {...rest}>
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
