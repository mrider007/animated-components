'use client'

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { BaseProps, RadiusProps, Radius } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

export interface ModalProps extends BaseProps, RadiusProps, Omit<HTMLMotionProps<"div">, "children"> {
  /** Controls visibility of the modal */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal content */
  children?: React.ReactNode;
  /** Predefined motion variant name */
  motionVariant?: keyof typeof motionVariants;
  /** Animation duration in seconds */
  duration?: number;
  /** Loop the animation */
  loop?: boolean;
  /** Close modal on Escape key */
  closeOnEscape?: boolean;
  /** Close modal on overlay click */
  closeOnOverlayClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  className = '',
  isOpen,
  onClose,
  motionVariant = 'scaleIn',
  duration = 0.3,
  loop = false,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  radius = '2xl',
  ...rest
}) => {
  const transition = {
    duration,
    ease: [0.34, 1.56, 0.64, 1], // Spring-like ease for modal
    ...(loop ? { repeat: Infinity, repeatType: 'loop' as const } : {}),
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

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEscape) {
      onClose();
    }
  }, [onClose, closeOnEscape]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={closeOnOverlayClick ? onClose : undefined}
              />
            </motion.div>

            {/* Trick to center modal on desktop */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            {/* Modal Content */}
            <motion.div
              className={`inline-block align-bottom bg-white text-left overflow-hidden shadow-2xl shadow-black/20 transform transition-all sm:my-8 sm:align-middle w-full max-w-lg border border-gray-100 ${getRadiusClasses()} ${className}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={motionVariants[motionVariant]}
              transition={transition}
              {...rest}
            >
              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
