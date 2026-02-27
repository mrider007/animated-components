'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { BaseProps, SizeProps, RadiusProps, Radius } from '../../../types/common';
import { motionVariants } from '../../utils/motionVariants';

type InputColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type TextColor = 'black' | 'gray' | 'white' | 'blue' | 'green' | 'red';

export interface InputProps extends BaseProps, SizeProps, RadiusProps {
  /** Input type */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Color theme */
  color?: InputColor;
  /** Text color */
  textColor?: TextColor;
  /** Predefined motion variant */
  motionVariant?: keyof typeof motionVariants;
  /** Label text */
  label?: string;
  /** Error state - shows red border and error text */
  error?: boolean | string;
  /** Helper text below the input */
  helperText?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Input id */
  id?: string;
  /** Input name */
  name?: string;
  /** Whether to animate on mount */
  useAnimation?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className = '',
  size = 'md',
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  color = 'primary',
  textColor = 'black',
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
  radius = 'md',
  ...rest
}, ref) => {
  const sizeClasses: Record<string, string> = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm md:text-base',
    lg: 'px-4 py-3 text-base md:text-lg',
    xl: 'px-5 py-4 text-lg md:text-xl',
  };

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

  const colorClasses = {
    primary: 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500',
    secondary: 'border-gray-200 focus:ring-gray-500/20 focus:border-gray-500',
    success: 'border-gray-200 focus:ring-green-500/20 focus:border-green-500',
    danger: 'border-gray-200 focus:ring-red-500/20 focus:border-red-500',
    warning: 'border-gray-200 focus:ring-yellow-500/20 focus:border-yellow-500',
    info: 'border-gray-200 focus:ring-blue-400/20 focus:border-blue-500',
  };

  const textColorClasses = {
    black: 'text-black',
    gray: 'text-gray-700',
    white: 'text-white',
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
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
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        className={`w-full border ${getRadiusClasses()} ${sizeClasses[size]} ${borderClass} ${textColorClasses[textColor]} ${className} bg-white transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-offset-0 ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:border-gray-300'}`}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        aria-invalid={hasError}
        aria-describedby={errorMessage || helperText ? `${id}-helper` : undefined}
        {...rest}
      />
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

Input.displayName = 'Input';
