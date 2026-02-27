'use client';

import React, { useState } from 'react';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps, RadiusProps, VariantProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | string;
type TabsVariant = 'underlined' | 'pills' | 'solid' | string;

export interface TabItem {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends BaseProps, RadiusProps {
  /** Array of tab items */
  tabs: TabItem[];
  motionVariant?: keyof typeof motionVariants;
  color?: Color;
  variant?: TabsVariant;
  fullWidth?: boolean;
  tabClassName?: string;
  panelClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  className = '',
  tabs,
  motionVariant = 'fadeIn',
  color = 'primary',
  variant = 'underlined',
  radius = 'lg',
  fullWidth = false,
  tabClassName = '',
  panelClassName = '',
  ...rest
}) => {
  const [activeTab, setActiveTab] = useState(0);

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

  const colorStyles: Record<string, Record<string, { active: string; inactive: string; indicator: string }>> = {
    primary: {
      underlined: { active: 'text-blue-600 font-semibold', inactive: 'text-gray-500 hover:text-gray-700', indicator: 'bg-blue-600' },
      pills: { active: 'text-blue-700 font-semibold', inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50', indicator: 'bg-blue-100 shadow-sm' },
      solid: { active: 'text-white font-semibold', inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100', indicator: 'bg-blue-600 shadow-md' },
    },
    secondary: {
      underlined: { active: 'text-gray-900 font-semibold', inactive: 'text-gray-500 hover:text-gray-700', indicator: 'bg-gray-900' },
      pills: { active: 'text-gray-800 font-semibold', inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50', indicator: 'bg-gray-200 shadow-sm' },
      solid: { active: 'text-white font-semibold', inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100', indicator: 'bg-gray-700 shadow-md' },
    },
    success: {
      underlined: { active: 'text-green-600 font-semibold', inactive: 'text-gray-500 hover:text-gray-700', indicator: 'bg-green-600' },
      pills: { active: 'text-green-800 font-semibold', inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50', indicator: 'bg-green-100 shadow-sm' },
      solid: { active: 'text-white font-semibold', inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100', indicator: 'bg-green-600 shadow-md' },
    },
    danger: {
      underlined: { active: 'text-red-600 font-semibold', inactive: 'text-gray-500 hover:text-gray-700', indicator: 'bg-red-600' },
      pills: { active: 'text-red-800 font-semibold', inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50', indicator: 'bg-red-100 shadow-sm' },
      solid: { active: 'text-white font-semibold', inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100', indicator: 'bg-red-600 shadow-md' },
    },
    warning: {
      underlined: { active: 'text-yellow-600 font-semibold', inactive: 'text-gray-500 hover:text-gray-700', indicator: 'bg-yellow-500' },
      pills: { active: 'text-yellow-800 font-semibold', inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50', indicator: 'bg-yellow-100 shadow-sm' },
      solid: { active: 'text-yellow-900 font-semibold', inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100', indicator: 'bg-yellow-400 shadow-md' },
    },
    info: {
      underlined: { active: 'text-cyan-600 font-semibold', inactive: 'text-gray-500 hover:text-gray-700', indicator: 'bg-cyan-600' },
      pills: { active: 'text-cyan-800 font-semibold', inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50', indicator: 'bg-cyan-100 shadow-sm' },
      solid: { active: 'text-white font-semibold', inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100', indicator: 'bg-cyan-600 shadow-md' },
    },
  };

  const appliedTheme = (colorStyles[color] || colorStyles.primary)[variant] || colorStyles.primary.underlined;

  // Base styling for the container holding the tabs
  const navContainerClass = variant === 'pills' ? 'p-1 bg-gray-50/50 rounded-xl inline-flex'
    : variant === 'solid' ? `p-1 bg-gray-100 inline-flex ${getRadiusClasses()}`
      : 'border-b border-gray-200/80 w-full';

  return (
    <div className={`w-full flex flex-col ${className}`} {...rest}>
      <div className="relative overflow-x-auto no-scrollbar">
        <nav className={`flex space-x-1 sm:space-x-2 relative ${navContainerClass}`} role="tablist">
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;

            // Adjust hit target padding based on variant
            const paddingClass = variant === 'underlined' ? 'px-4 py-3' : 'px-4 py-2 my-1 mx-1 z-10';

            return (
              <button
                key={index}
                disabled={tab.disabled}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${index}`}
                id={`tab-${index}`}
                className={`relative text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-${color}-400/50 ${paddingClass}
                  ${fullWidth ? 'flex-1 text-center' : ''} 
                  ${isActive ? appliedTheme.active : appliedTheme.inactive} 
                  ${tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} 
                  ${variant !== 'underlined' ? getRadiusClasses() : ''}
                  ${tabClassName}`}
                onClick={() => !tab.disabled && setActiveTab(index)}
              >
                {/* Text Label - Elevated above indicator */}
                <span className="relative z-20 mix-blend-normal">{tab.label}</span>

                {/* Animated Indicator */}
                {isActive && (
                  <motion.div
                    layoutId={`tab-indicator-${className || 'tabs'}`}
                    className={`absolute inset-0 z-0 ${appliedTheme.indicator} ${variant !== 'underlined' ? getRadiusClasses() : ''}`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={variant === 'underlined' ? { top: 'auto', bottom: 0, height: '2px', left: '10%', right: '10%', width: 'auto' } as React.CSSProperties : undefined}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="relative mt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={motionVariants[motionVariant]}
            className={`w-full text-gray-700 outline-none ${panelClassName}`}
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
          >
            {tabs[activeTab]?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
