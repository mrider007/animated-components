'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants'; 
import { BaseProps, WithChildren } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface TabsProps extends BaseProps, WithChildren {
  tabs: { label: string; content: React.ReactNode }[];
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
  color?: Color;
}

export const Tabs: React.FC<TabsProps> = ({
  className = '',
  tabs,
  motionVariant = 'fadeIn', // Default motion variant
  color = 'primary', // Color customization
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const colorClasses = {
    primary: 'text-blue-600 border-blue-500',
    secondary: 'text-gray-600 border-gray-500',
    success: 'text-green-600 border-green-500',
    danger: 'text-red-600 border-red-500',
    warning: 'text-yellow-600 border-yellow-500',
    info: 'text-blue-400 border-blue-400',
  };

  return (
    <div className={className}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === index
                  ? `${colorClasses[color]}`
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        variants={motionVariants[motionVariant]}
        className="mt-4"
      >
        {tabs[activeTab].content}
      </motion.div>
    </div>
  );
};
