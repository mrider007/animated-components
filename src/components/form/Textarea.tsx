'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps, SizeProps, RadiusProps, Radius } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface TextareaProps extends BaseProps, SizeProps, RadiusProps {
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Number of rows */
  rows?: number;
  /** Color theme */
  color?: Color;
  /** Predefined motion variant */
  motionVariant?: keyof typeof motionVariants;
  /** Label text */
  label?: string;
  /** Error state */
  error?: boolean | string;
  /** Helper text below the textarea */
  helperText?: string;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Whether the textarea is required */
  required?: boolean;
  /** Whether the textarea is read-only */
  readOnly?: boolean;
  /** Textarea id */
  id?: string;
  /** Textarea name */
  name?: string;
  /** Whether to animate on mount */
  useAnimation?: boolean;
  /** Allow resize */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  /** Max length */
  maxLength?: number;
  /** Show character count */
  showCharCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className = '',
  size = 'md',
  placeholder,
  value,
  defaultValue,
  onChange,
  rows = 4,
  color = 'primary',
  motionVariant = 'fadeIn',
  label,
  error,
  helperText,
  disabled = false,
  required = false,
  readOnly = false,
  id,
  name,
  useAnimation = true,
  resize = 'vertical',
  maxLength,
  showCharCount = false,
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
      case 'full': return 'rounded-3xl'; // textareas shouldn't be fully round usually
      default: return `rounded-${radius}`;
    }
  };

  const baseClasses = `w-full border ${getRadiusClasses()} bg-white transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-offset-0`;

  const colorClasses = {
    primary: 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500',
    secondary: 'border-gray-200 focus:ring-gray-500/20 focus:border-gray-500',
    success: 'border-gray-200 focus:ring-green-500/20 focus:border-green-500',
    danger: 'border-gray-200 focus:ring-red-500/20 focus:border-red-500',
    warning: 'border-gray-200 focus:ring-yellow-500/20 focus:border-yellow-500',
    info: 'border-gray-200 focus:ring-blue-400/20 focus:border-blue-500',
  };

  const sizeClasses: Record<string, string> = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm md:text-base',
    lg: 'px-4 py-3 text-base md:text-lg',
    xl: 'px-5 py-4 text-lg md:text-xl',
  };

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  const errorMessage = typeof error === 'string' ? error : undefined;
  const hasError = !!error;
  const borderClass = hasError ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : colorClasses[color];
  const charCount = typeof value === 'string' ? value.length : 0;

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
      <textarea
        ref={ref}
        id={id}
        name={name}
        className={`${baseClasses} ${borderClass} ${sizeClasses[size]} ${resizeClasses[resize]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:border-gray-300'}`}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        maxLength={maxLength}
        aria-invalid={hasError}
        aria-describedby={errorMessage || helperText ? `${id}-helper` : undefined}
        {...rest}
      />
      <div className="flex justify-between mt-1">
        {(errorMessage || helperText) && (
          <p
            id={`${id}-helper`}
            className={`text-sm ${hasError ? 'text-red-600' : 'text-gray-500'}`}
          >
            {errorMessage || helperText}
          </p>
        )}
        {showCharCount && maxLength && (
          <span className={`text-xs ml-auto ${charCount >= maxLength ? 'text-red-500' : 'text-gray-400'}`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </motion.div>
  );
});

Textarea.displayName = 'Textarea';
