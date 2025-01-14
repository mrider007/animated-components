import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps } from '../../../types/common';

interface RadioProps extends BaseProps {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Radio: React.FC<RadioProps> = ({
  className = '',
  label,
  name,
  value,
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
        type="radio"
        className="form-radio h-5 w-5 text-blue-600"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </motion.label>
  );
};

