'use client'

import React from 'react';
import { motion, AnimatePresence, Variant } from 'framer-motion';
import { BaseProps, WithChildren } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

interface ModalProps extends BaseProps, WithChildren {
  isOpen: boolean;
  onClose: () => void;
  motionVariant?: keyof typeof motionVariants;
}

export const Modal: React.FC<ModalProps> = ({ children, className = '', isOpen, onClose,motionVariant='bounce' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          variants={motionVariants[motionVariant]}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 opacity-75" onClick={onClose}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <motion.div
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${className}`}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

