import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps } from '../../../types/common';

interface SwitchProps extends BaseProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({ className = '', checked, onChange, label }) => {
  return (
    <motion.label
      className={`inline-flex items-center cursor-pointer ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`w-10 h-6 bg-gray-200 rounded-full shadow-inner ${checked ? 'bg-blue-600' : ''}`}></div>
        <div className={`absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 left-1 transition-transform duration-200 ease-in-out ${checked ? 'transform translate-x-4' : ''}`}></div>
      </div>
      {label && <span className="ml-3 text-sm font-medium text-gray-900">{label}</span>}
    </motion.label>
  );
};

