'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { BaseProps, WithChildren } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants'; 

type Color = 'primary' | 'secondary' | 'danger' | 'success' | 'info' | 'warning';
type Variant = 'solid' | 'outline' | 'ghost';


interface AccordionProps extends BaseProps, WithChildren {
  items: { title: string; content: React.ReactNode }[];
  color?: Color;
  variant?: Variant;
  motionVariant?: keyof typeof motionVariants;
}

export const Accordion: React.FC<AccordionProps> = ({
  className = '',
  items,
  color = 'primary',
  variant = 'solid',
  motionVariant = 'fadeIn',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const colors = {
    primary: {
      solid: 'bg-blue-100 border-blue-400 text-blue-900',
      outline: 'border-blue-400 text-blue-600',
      ghost: 'text-blue-600 hover:bg-blue-50',
    },
    secondary: {
      solid: 'bg-gray-100 border-gray-400 text-gray-900',
      outline: 'border-gray-400 text-gray-600',
      ghost: 'text-gray-600 hover:bg-gray-50',
    },
    danger: {
      solid: 'bg-red-100 border-red-400 text-red-900',
      outline: 'border-red-400 text-red-600',
      ghost: 'text-red-600 hover:bg-red-50',
    },
    success: {
      solid: 'bg-green-100 border-green-400 text-green-900',
      outline: 'border-green-400 text-green-600',
      ghost: 'text-green-600 hover:bg-green-50',
    },
    info: {
      solid: 'bg-blue-100 border-blue-400 text-blue-900',
      outline: 'border-blue-400 text-blue-600',
      ghost: 'text-blue-600 hover:bg-blue-50',
    },
    warning: {
      solid: 'bg-yellow-100 border-yellow-400 text-yellow-900',
      outline: 'border-yellow-400 text-yellow-600',
      ghost: 'text-yellow-600 hover:bg-yellow-50',
    },
  };

  const variantClasses = colors[color][variant];

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className={`border rounded-md ${variantClasses}`}>
          <button
            className={`flex justify-between items-center w-full px-4 py-2 text-left focus:outline-none`}
            onClick={() => toggleItem(index)}
          >
            <span>{item.title}</span>
            <motion.svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </motion.svg>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                variants={motionVariants[motionVariant]}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="px-4 py-2 border-t"
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
