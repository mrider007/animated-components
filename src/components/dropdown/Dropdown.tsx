'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants'; 
import { BaseProps, WithChildren } from '../../../types/common';

interface DropdownProps extends BaseProps, WithChildren {
  trigger: React.ReactNode;
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
}

export const Dropdown: React.FC<DropdownProps> = ({ children, className = '', trigger, motionVariant = 'fadeIn' },...rest) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(prev => !prev)}  // Toggle state to show/hide
        >
          {trigger}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={motionVariants[motionVariant]} 
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              {...rest}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
