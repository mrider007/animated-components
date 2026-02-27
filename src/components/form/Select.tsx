'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps, SizeProps, RadiusProps, Radius } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends BaseProps, SizeProps, RadiusProps {
  /** Options to display */
  options: SelectOption[];
  /** Current value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Color theme */
  color?: Color;
  /** Predefined motion variant */
  motionVariant?: keyof typeof motionVariants;
  /** Label text */
  label?: string;
  /** Placeholder option text */
  placeholder?: string;
  /** Error state */
  error?: boolean | string;
  /** Helper text below the select */
  helperText?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is required */
  required?: boolean;
  /** Select id */
  id?: string;
  /** Select name */
  name?: string;
  /** Whether to animate on mount */
  useAnimation?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className = '',
  size = 'md',
  options,
  value,
  defaultValue,
  onChange,
  color = 'primary',
  motionVariant = 'fadeIn',
  label,
  placeholder,
  error,
  helperText,
  disabled = false,
  required = false,
  id,
  name,
  useAnimation = true,
  radius = 'md',
  ...rest
}, ref) => {
  const getRadiusClasses = () => {
    switch (radius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case 'xl': return 'rounded-xl';
      case '2xl': return 'rounded-2xl';
      case 'full': return 'rounded-full';
      default: return `rounded-${radius}`;
    }
  };

  const baseClasses = `w-full border ${getRadiusClasses()} bg-white transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-offset-0`;

  const colorClasses = {
    primary: 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800',
    secondary: 'border-gray-200 focus:ring-gray-500/20 focus:border-gray-500 text-gray-800',
    success: 'border-gray-200 focus:ring-green-500/20 focus:border-green-500 text-gray-800',
    danger: 'border-gray-200 focus:ring-red-500/20 focus:border-red-500 text-gray-800',
    warning: 'border-gray-200 focus:ring-yellow-500/20 focus:border-yellow-500 text-gray-800',
    info: 'border-gray-200 focus:ring-blue-400/20 focus:border-blue-500 text-gray-800',
  };

  const sizeClasses: Record<string, string> = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm md:text-base',
    lg: 'px-4 py-3 text-base md:text-lg',
    xl: 'px-5 py-4 text-lg md:text-xl',
  };

  const errorMessage = typeof error === 'string' ? error : undefined;
  const hasError = !!error;
  const borderClass = hasError ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : colorClasses[color];

  return (
    <motion.div
      variants={motionVariants[motionVariant]}
      initial={useAnimation ? "hidden" : false}
      animate={useAnimation ? "visible" : false}
    >
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-1 ${hasError ? 'text-red-600' : 'text-gray-700'}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        name={name}
        className={`${baseClasses} ${borderClass} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:border-gray-300'}`}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-invalid={hasError}
        aria-describedby={errorMessage || helperText ? `${id}-helper` : undefined}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {(errorMessage || helperText) && (
        <p
          id={`${id}-helper`}
          className={`mt-1 text-sm ${hasError ? 'text-red-600' : 'text-gray-500'}`}
        >
          {errorMessage || helperText}
        </p>
      )}
    </motion.div>
  );
});

Select.displayName = 'Select';
