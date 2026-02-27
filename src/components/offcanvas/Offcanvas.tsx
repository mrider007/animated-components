'use client';

import React, { ReactNode } from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { BaseProps, RadiusProps } from '../../../types/common';

/**
 * A fully customizable offcanvas panel component.
 */
export interface OffcanvasProps extends BaseProps, RadiusProps, Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> {
  /** Controls visibility of the panel */
  isOpen: boolean;
  /** Callback when panel should close */
  onClose: () => void;
  /** Which edge the panel should originate from */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** Panel size utility classes (width/height) */
  panelSizeClass?: string;
  /** Background classes for the overlay layer */
  overlayBgClass?: string;
  /** Background classes for the panel content */
  panelBgClass?: string;
  /** Shadow classes for the panel */
  panelShadowClass?: string;
  /** z-index utility class */
  zIndex?: string;
  /** If true, clicking the overlay closes the panel */
  closeOnOverlayClick?: boolean;
  /** Custom close icon placed inside the panel */
  customCloseIcon?: ReactNode;
  /** Optional children rendering */
  children?: ReactNode;
}

export const Offcanvas: React.FC<OffcanvasProps> = ({
  isOpen,
  onClose,
  position = 'left',
  className = '',
  children,
  panelSizeClass = 'max-w-md w-full',
  overlayBgClass = 'bg-black/40 backdrop-blur-sm',
  panelBgClass = 'bg-white',
  panelShadowClass = 'shadow-2xl',
  zIndex = 'z-50',
  closeOnOverlayClick = true,
  customCloseIcon,
  radius = 'none',
  ...rest
}) => {
  const getRadiusClasses = () => {
    switch (radius) {
      case 'none': return 'rounded-none';
      case 'sm': return position === 'left' ? 'rounded-r-sm' : position === 'right' ? 'rounded-l-sm' : position === 'top' ? 'rounded-b-sm' : 'rounded-t-sm';
      case 'md': return position === 'left' ? 'rounded-r-md' : position === 'right' ? 'rounded-l-md' : position === 'top' ? 'rounded-b-md' : 'rounded-t-md';
      case 'lg': return position === 'left' ? 'rounded-r-lg' : position === 'right' ? 'rounded-l-lg' : position === 'top' ? 'rounded-b-lg' : 'rounded-t-lg';
      case 'xl': return position === 'left' ? 'rounded-r-xl' : position === 'right' ? 'rounded-l-xl' : position === 'top' ? 'rounded-b-xl' : 'rounded-t-xl';
      case '2xl': return position === 'left' ? 'rounded-r-2xl' : position === 'right' ? 'rounded-l-2xl' : position === 'top' ? 'rounded-b-2xl' : 'rounded-t-2xl';
      case 'full': return position === 'left' ? 'rounded-r-3xl' : position === 'right' ? 'rounded-l-3xl' : position === 'top' ? 'rounded-b-3xl' : 'rounded-t-3xl';
      default: return `rounded-${radius}`;
    }
  };

  const posClasses: Record<string, string> = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
  };

  const variants = {
    hidden: {
      x: position === 'left' ? '-100%' : position === 'right' ? '100%' : 0,
      y: position === 'top' ? '-100%' : position === 'bottom' ? '100%' : 0,
    },
    visible: {
      x: 0,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className={`fixed inset-0 ${zIndex} overflow-hidden`} {...rest}>
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className={`absolute inset-0 ${overlayBgClass}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeOnOverlayClick ? onClose : undefined}
            />
            <section className={`absolute ${posClasses[position]} ${panelSizeClass}`}>
              <motion.div
                className={`flex flex-col h-full w-full transform ${className} ${panelBgClass} ${panelShadowClass} ${getRadiusClasses()}`}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {customCloseIcon && (
                  <button
                    className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded-full transition-colors"
                    onClick={onClose}
                    aria-label="Close panel"
                  >
                    {customCloseIcon}
                  </button>
                )}
                {children}
              </motion.div>
            </section>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
