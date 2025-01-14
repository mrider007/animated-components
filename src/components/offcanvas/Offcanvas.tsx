'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseProps, WithChildren } from '../../../types/common';

interface OffcanvasProps extends BaseProps, WithChildren {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export const Offcanvas: React.FC<OffcanvasProps> = ({ children, className = '', isOpen, onClose, position = 'left' }) => {
  const positionClasses = {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            ></motion.div>
            <section className={`absolute ${positionClasses[position]} max-w-md`}>
              <motion.div
                className={`h-full w-full transform transition ease-in-out duration-300 ${className}`}
                initial={variants[position]}
                animate={{ x: 0, y: 0 }}
                exit={variants[position]}
                transition={{ duration: 0.3 }}
              >
                <div className="h-full bg-white shadow-xl">
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

