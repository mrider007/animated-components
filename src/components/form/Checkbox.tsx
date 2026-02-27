'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps } from '../../../types/common';

type CheckboxColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface CheckboxProps extends BaseProps {
  /** Label text */
  label: string;
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Color theme */
  color?: CheckboxColor;
  /** Predefined motion variant */
  motionVariant?: keyof typeof motionVariants;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Checkbox id */
  id?: string;
  /** Checkbox name */
  name?: string;
  /** Error state */
  error?: boolean | string;
  /** Helper text */
  helperText?: string;
  /** Whether to animate on mount */
  useAnimation?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  className = '',
  label,
  checked,
  defaultChecked,
  onChange,
  color = 'primary',
  motionVariant = 'fadeIn',
  disabled = false,
  id,
  name,
  error,
  helperText,
  useAnimation = true,
  ...rest
}, ref) => {
  const colorClasses = {
    primary: 'border-gray-300 text-blue-600 focus:ring-blue-500/30',
    secondary: 'border-gray-300 text-gray-700 focus:ring-gray-500/30',
    success: 'border-gray-300 text-green-500 focus:ring-green-500/30',
    danger: 'border-gray-300 text-red-500 focus:ring-red-500/30',
    warning: 'border-gray-300 text-yellow-400 focus:ring-yellow-400/30',
    info: 'border-gray-300 text-cyan-500 focus:ring-cyan-500/30',
  };

  const errorMessage = typeof error === 'string' ? error : undefined;
  const hasError = !!error;

  return (
    <motion.div
      variants={motionVariants[motionVariant]}
      initial={useAnimation ? "hidden" : false}
      animate={useAnimation ? "visible" : false}
    >
      <label
        htmlFor={id}
        className={`inline-flex items-center cursor-pointer group select-none ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            id={id}
            name={name}
            type="checkbox"
            className={`peer appearance-none h-5 w-5 rounded transition-all duration-300 ease-out border bg-white checked:border-transparent focus:outline-none focus:ring-4 focus:ring-offset-1 ${hasError ? 'border-red-300 bg-red-50 text-red-500 focus:ring-red-500/30' : colorClasses[color]}`}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={hasError}
            {...rest}
          />
          <svg className="absolute w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 peer-checked:scale-100 scale-50 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-white" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className={`ml-3 text-sm font-medium transition-colors duration-200 ${hasError ? 'text-red-600' : 'text-gray-700 group-hover:text-gray-900'}`}>{label}</span>
      </label>
      {(errorMessage || helperText) && (
        <p className={`mt-1 text-sm ${hasError ? 'text-red-600' : 'text-gray-500'}`}>
          {errorMessage || helperText}
        </p>
      )}
    </motion.div>
  );
});

Checkbox.displayName = 'Checkbox';