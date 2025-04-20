'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseProps, WithChildren } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

interface ModalProps extends BaseProps, WithChildren {
  isOpen: boolean;
  onClose: () => void;
  motionVariant?: keyof typeof motionVariants;
  duration?: number;
  loop?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ children, className = '', isOpen, onClose,motionVariant='bounce',duration = 0.3,
  loop = false, ...rest }) => {
    const transition = {
      duration,
      ...(loop ? { repeat: Infinity, repeatType: 'loop' } : {}),
    };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          {...rest} initial="hidden"
      animate="visible"
      transition={{ transition }}
          variants={motionVariants[motionVariant]}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-black opacity-45" onClick={onClose}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <motion.div
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full max-w-lg ${className}`}
            >
              {/* Modal Content */}
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

