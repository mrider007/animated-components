import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps, SizeProps } from '../../../types/common';

interface TextareaProps extends BaseProps, SizeProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  className = '',
  size = 'md',
  placeholder,
  value,
  onChange,
  rows = 4,
}) => {
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
    xl: 'px-5 py-4 text-xl',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <textarea
        className={`w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${sizeClasses[size]} ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
      />
    </motion.div>
  );
};

