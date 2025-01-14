import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps } from '../../../types/common';

interface CheckboxProps extends BaseProps {
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className = '',
  label,
  checked,
  onChange,
}) => {
  return (
    <motion.label
      className={`inline-flex items-center ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600"
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </motion.label>
  );
};

