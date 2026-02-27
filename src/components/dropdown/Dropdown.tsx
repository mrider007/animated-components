'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps, RadiusProps, Radius } from '../../../types/common';

export interface DropdownProps extends BaseProps, RadiusProps {
  /** The element that triggers the dropdown */
  trigger: React.ReactNode;
  /** Dropdown content */
  children?: React.ReactNode;
  /** Predefined motion variant name */
  motionVariant?: keyof typeof motionVariants;
  /** Callback when dropdown opens */
  onOpen?: () => void;
  /** Callback when dropdown closes */
  onClose?: () => void;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  className = '',
  trigger,
  motionVariant = 'scaleIn',
  onOpen,
  onClose,
  disabled = false,
  radius = 'lg',
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    onOpen?.();
  }, [disabled, onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [close]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

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

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef} {...rest}>
      <div
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`focus:outline-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={motionVariants[motionVariant]}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`absolute z-50 mt-2 min-w-[200px] origin-top-right bg-white/90 backdrop-blur-md border border-white/40 shadow-xl shadow-gray-200/40 focus:outline-none overflow-hidden ${getRadiusClasses()}`}
            role="menu"
            style={{ transformOrigin: 'top right' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
