import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps, SizeProps } from '../../../types/common';


type InputColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type TextColor = 'black' | 'gray' | 'white' | 'blue' | 'green' | 'red'; 

interface InputProps extends BaseProps, SizeProps {
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: InputColor; 
  textColor?: TextColor;
}

export const Input: React.FC<InputProps> = ({
  className = '',
  size = 'md',
  type = 'text',
  placeholder,
  value,
  onChange,
  color = 'primary',
  textColor = 'black',
}) => {
 
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
    xl: 'px-5 py-4 text-xl',
  };

  const colorClasses = {
    primary: 'border-blue-300 focus:ring-blue-500 focus:border-blue-500',
    secondary: 'border-gray-300 focus:ring-gray-500 focus:border-gray-500',
    success: 'border-green-300 focus:ring-green-500 focus:border-green-500',
    danger: 'border-red-300 focus:ring-red-500 focus:border-red-500',
    warning: 'border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500',
    info: 'border-blue-400 focus:ring-blue-500 focus:border-blue-500',
  };

  const textColorClasses = {
    black: 'text-black',
    gray: 'text-gray-700',
    white: 'text-white',
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type={type}
        className={`w-full rounded-md ${sizeClasses[size]} ${colorClasses[color]} ${textColorClasses[textColor]} ${className} focus:outline-none focus:ring-2`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </motion.div>
  );
};
