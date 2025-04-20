'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants'; 
import { BaseProps } from '../../../types/common';

type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface FileUploadProps extends BaseProps {
  onChange: (file: File | null) => void;
  accept?: string;
  multiple?: boolean;
  buttonColor?: ButtonColor; // Customizable color for the button
  motionVariant?: keyof typeof motionVariants; // Predefined motion variant name
}

export const FileUpload: React.FC<FileUploadProps> = ({
  className = '',
  onChange,
  accept,
  multiple,
  buttonColor = 'primary', // Default button color
  motionVariant = 'fadeIn', // Default motion variant
  ...rest
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
  };

  const buttonColorClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400',
    info: 'bg-blue-400 text-white hover:bg-blue-500 focus:ring-blue-300',
  };

  return (
    <motion.div
      className={`flex items-center ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      variants={motionVariants[motionVariant]}
      
    >
      <button
        type="button"
        onClick={handleClick}
        className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonColorClasses[buttonColor]}`}
      >
        Choose File
      </button>
      <input
      {...rest}
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />
    </motion.div>
  );
};
