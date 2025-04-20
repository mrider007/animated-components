'use client';

import React, { ReactNode } from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { BaseProps, WithChildren } from '../../../types/common';

/**
 * A fully customizable offcanvas panel component.
 */
export interface OffcanvasProps extends BaseProps, WithChildren {
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
  /** Duration of open/close animations in seconds */
  duration?: number;
  /** Custom close icon placed inside the panel */
  customCloseIcon?: ReactNode;
  /** Override motion props on the overlay */
  overlayMotion?: Partial<MotionProps>;
  /** Override motion props on the panel */
  panelMotion?: Partial<MotionProps>;
  loop?:boolean;
}

export const Offcanvas: React.FC<OffcanvasProps> = ({
  isOpen,
  onClose,
  position = 'left',
  className = '',
  children,
  panelSizeClass = 'max-w-md',
  overlayBgClass = 'bg-black bg-opacity-75',
  panelBgClass = 'bg-white',
  panelShadowClass = 'shadow-xl',
  zIndex = 'z-50',
  closeOnOverlayClick = true,
  duration = 0.3,
  loop = false,
  customCloseIcon,
  overlayMotion,
  panelMotion,
  ...rest
}) => {
  const posClasses = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
  };
  const variants = {
    left: { x: '-100%' },
    right: { x: '100%' },
    top: { y: '-100%' },
    bottom: { y: '100%' },
  };
  const transition = {
    duration,
    ...(loop ? { repeat: Infinity, repeatType: 'loop' } : {}),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-0 ${zIndex} overflow-hidden`}>
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className={`absolute inset-0 ${overlayBgClass}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{transition}}
              onClick={closeOnOverlayClick ? onClose : undefined}
              {...overlayMotion}
            />
            <section className={`absolute ${posClasses[position]} ${panelSizeClass}`}>  
              <motion.div
                className={`h-full w-full transform ${className}`}
                initial={variants[position]}
                animate={{ x: 0, y: 0 }}
                exit={variants[position]}
                transition={{transition}}
                {...panelMotion}
              >
                <div className={`${panelBgClass} ${panelShadowClass} h-full relative`}>  
                  {customCloseIcon && (
                    <button
                      className="absolute top-2 right-2"
                      onClick={onClose}
                      aria-label="Close"
                    >
                      {customCloseIcon}
                    </button>
                  )}
                  {children}
                </div>
              </motion.div>
            </section>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
