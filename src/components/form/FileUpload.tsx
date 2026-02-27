'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';
import { BaseProps } from '../../../types/common';

type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface FileUploadProps extends BaseProps {
  /** File change handler */
  onChange: (file: File | null) => void;
  /** Multiple files change handler */
  onMultipleChange?: (files: FileList | null) => void;
  /** Accepted file types */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Button color theme */
  buttonColor?: ButtonColor;
  /** Predefined motion variant */
  motionVariant?: keyof typeof motionVariants;
  /** Custom button text */
  buttonText?: string;
  /** Whether the upload is disabled */
  disabled?: boolean;
  /** Whether to animate on mount */
  useAnimation?: boolean;
  /** Max file size in bytes */
  maxSize?: number;
  /** Error callback when file exceeds max size */
  onError?: (error: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  className = '',
  onChange,
  onMultipleChange,
  accept,
  multiple,
  buttonColor = 'primary',
  motionVariant = 'fadeIn',
  buttonText = 'Choose File',
  disabled = false,
  useAnimation = true,
  maxSize,
  onError,
  ...rest
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (maxSize && files) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSize) {
          onError?.(`File "${files[i].name}" exceeds maximum size of ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
          event.target.value = '';
          return;
        }
      }
    }

    if (multiple && onMultipleChange) {
      onMultipleChange(files);
    } else {
      const file = files?.[0] || null;
      onChange(file);
    }
  };

  const buttonColorClasses: Record<ButtonColor, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md shadow-blue-500/20 active:scale-95',
    secondary: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700 shadow-md shadow-gray-900/20 active:scale-95',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400 shadow-md shadow-green-500/20 active:scale-95',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-md shadow-red-500/20 active:scale-95',
    warning: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 focus:ring-yellow-400 shadow-md shadow-yellow-400/20 active:scale-95',
    info: 'bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-400 shadow-md shadow-cyan-500/20 active:scale-95',
  };

  return (
    <motion.div
      className={`flex items-center ${className}`}
      variants={motionVariants[motionVariant]}
      initial={useAnimation ? "hidden" : false}
      animate={useAnimation ? "visible" : false}
    >
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonColorClasses[buttonColor]} ${disabled ? 'opacity-50 cursor-not-allowed shadow-none active:scale-100' : ''}`}
      >
        {buttonText}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
        disabled={disabled}
        {...rest}
      />
    </motion.div>
  );
};
