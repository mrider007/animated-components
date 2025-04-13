'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps, WithChildren } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type Variant = 'solid' | 'outline' | 'ghost';

interface TabItem {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps extends BaseProps, WithChildren {
  tabs: TabItem[];
  motionVariant?: keyof typeof motionVariants;
  color?: Color;
  variant?: Variant;
  fullWidth?: boolean;
  tabClassName?: string;
  panelClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  className = '',
  tabs,
  motionVariant = 'fadeIn',
  color = 'primary',
  variant = 'solid',
  fullWidth = false,
  tabClassName = '',
  panelClassName = '',
  ...rest
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const colorStyles = {
    primary: {
      solid: 'text-blue-600 border-b-2 border-blue-600 bg-blue-50',
      outline: 'text-blue-600 border border-blue-600',
      ghost: 'text-blue-600 hover:bg-blue-100',
    },
    secondary: {
      solid: 'text-gray-600 border-b-2 border-gray-600 bg-gray-50',
      outline: 'text-gray-600 border border-gray-600',
      ghost: 'text-gray-600 hover:bg-gray-100',
    },
    success: {
      solid: 'text-green-600 border-b-2 border-green-600 bg-green-50',
      outline: 'text-green-600 border border-green-600',
      ghost: 'text-green-600 hover:bg-green-100',
    },
    danger: {
      solid: 'text-red-600 border-b-2 border-red-600 bg-red-50',
      outline: 'text-red-600 border border-red-600',
      ghost: 'text-red-600 hover:bg-red-100',
    },
    warning: {
      solid: 'text-yellow-600 border-b-2 border-yellow-600 bg-yellow-50',
      outline: 'text-yellow-600 border border-yellow-600',
      ghost: 'text-yellow-600 hover:bg-yellow-100',
    },
    info: {
      solid: 'text-blue-400 border-b-2 border-blue-400 bg-blue-50',
      outline: 'text-blue-400 border border-blue-400',
      ghost: 'text-blue-400 hover:bg-blue-100',
    },
  };

  const getTabClass = (isActive: boolean) => {
    if (isActive) return colorStyles[color][variant];
    return 'text-gray-500 hover:text-gray-700 hover:border-gray-300';
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4 overflow-x-auto" role="tablist">
          {tabs.map((tab, index) => (
            <button
              key={index}
              disabled={tab.disabled}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`panel-${index}`}
              className={`px-4 py-2 text-sm font-medium focus:outline-none rounded-md transition-all 
                ${fullWidth ? 'flex-1 text-center' : ''} 
                ${getTabClass(activeTab === index)} 
                ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''} 
                ${tabClassName}`}
              onClick={() => !tab.disabled && setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <motion.div
        key={activeTab}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={motionVariants[motionVariant]}
        className={`mt-4 ${panelClassName}`}
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        {...rest}
      >
        {tabs[activeTab]?.content}
      </motion.div>
    </div>
  );
};
