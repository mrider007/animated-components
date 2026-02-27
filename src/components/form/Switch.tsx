'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface SwitchProps extends BaseProps {
  /** Whether the switch is on */
  checked: boolean;
  /** Change handler */
  onChange: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Color theme */
  color?: Color;
  /** Predefined motion variant */
  motionVariant?: keyof typeof motionVariants;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Switch id */
  id?: string;
  /** Switch name */
  name?: string;
  /** Size of the switch */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to animate on mount */
  useAnimation?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  className = '',
  checked,
  onChange,
  label,
  color = 'primary',
  motionVariant = 'fadeIn',
  disabled = false,
  id,
  name,
  size = 'md',
  useAnimation = true,
  ...rest
}) => {
  const baseClasses = 'inline-flex items-center cursor-pointer';

  const colorClasses = {
    primary: 'bg-blue-600 focus-within:ring-blue-500/30',
    secondary: 'bg-gray-700 focus-within:ring-gray-500/30',
    success: 'bg-green-500 focus-within:ring-green-500/30',
    danger: 'bg-red-500 focus-within:ring-red-500/30',
    warning: 'bg-yellow-400 focus-within:ring-yellow-400/30',
    info: 'bg-cyan-500 focus-within:ring-cyan-500/30',
  };

  const sizeConfig = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-10 h-6 pl-[2px]', thumb: 'w-4 h-4', translate: 'translate-x-[18px]' },
    lg: { track: 'w-14 h-8 pl-[3px]', thumb: 'w-6 h-6', translate: 'translate-x-[26px]' },
  };

  const { track, thumb, translate } = sizeConfig[size];

  return (
    <motion.label
      htmlFor={id}
      className={`${baseClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      variants={motionVariants[motionVariant]}
      initial={useAnimation ? "hidden" : false}
      animate={useAnimation ? "visible" : false}
    >
      <div className={`relative flex items-center rounded-full transition-all duration-300 ease-in-out focus-within:ring-4 focus-within:ring-offset-1 ${track} ${checked ? colorClasses[color] : 'bg-gray-300'}`}>
        <input
          id={id}
          name={name}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          role="switch"
          aria-checked={checked}
          {...rest}
        />
        <div
          className={`absolute ${thumb} bg-white rounded-full shadow-md transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${checked ? `transform ${translate}` : 'translate-x-1'}`}
        />
      </div>
      {label && <span className="ml-3 text-sm font-medium text-gray-800">{label}</span>}
    </motion.label>
  );
};
