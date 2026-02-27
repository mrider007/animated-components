'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps, SizeProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface RadioProps extends BaseProps, SizeProps {
  /** Label text */
  label: string;
  /** Radio group name */
  name: string;
  /** Radio value */
  value: string;
  /** Whether the radio is checked */
  checked?: boolean;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Color theme */
  color?: Color;
  /** Predefined motion variant */
  motionVariant?: keyof typeof motionVariants;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Radio id */
  id?: string;
  /** Error state */
  error?: boolean | string;
  /** Helper text */
  helperText?: string;
  /** Whether to animate on mount */
  useAnimation?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  className = '',
  label,
  name,
  value,
  checked,
  defaultChecked,
  onChange,
  color = 'primary',
  size = 'md',
  motionVariant = 'fadeIn',
  disabled = false,
  id,
  error,
  helperText,
  useAnimation = true,
  ...rest
}, ref) => {
  const baseClasses = 'inline-flex items-center cursor-pointer';

  const colorClasses = {
    primary: 'border-gray-300 text-blue-600 focus:ring-blue-500/30',
    secondary: 'border-gray-300 text-gray-700 focus:ring-gray-500/30',
    success: 'border-gray-300 text-green-500 focus:ring-green-500/30',
    danger: 'border-gray-300 text-red-500 focus:ring-red-500/30',
    warning: 'border-gray-300 text-yellow-500 focus:ring-yellow-500/30',
    info: 'border-gray-300 text-cyan-500 focus:ring-cyan-500/30',
  };

  const sizeClasses: Record<string, string> = {
    xs: 'h-4 w-4',
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-7 w-7',
    xl: 'h-8 w-8',
    '2xl': 'h-10 w-10',
    full: 'h-full w-full',
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
        className={`${baseClasses} group select-none ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            id={id}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            disabled={disabled}
            className={`peer appearance-none rounded-full transition-all duration-300 ease-out border bg-white focus:outline-none focus:ring-4 focus:ring-offset-1 ${hasError ? 'border-red-300 text-red-500 focus:ring-red-500/30' : colorClasses[color]} ${sizeClasses[size]}`}
            aria-invalid={hasError}
            {...rest}
          />
          <div className="absolute inset-0 m-auto w-1/2 h-1/2 rounded-full bg-current scale-0 peer-checked:scale-100 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none" />
        </div>
        <span className={`ml-3 text-sm font-medium transition-colors duration-200 ${hasError ? 'text-red-600' : 'text-gray-700 group-hover:text-gray-900'}`}>{label}</span>
      </label>
      {(errorMessage || helperText) && (
        <p className={`mt-1 text-sm ${hasError ? 'text-red-600' : 'text-gray-500'}`}>
          {errorMessage || helperText}
        </p>
      )
      }
    </motion.div >
  );
});

Radio.displayName = 'Radio';
