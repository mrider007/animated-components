import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

interface OffcanvasHeaderProps extends BaseProps, WithChildren {
  onClose: () => void;
}

export const OffcanvasHeader: React.FC<OffcanvasHeaderProps> = ({ children, className = '', onClose }) => {
  return (
    <div className={`px-4 py-3 border-b border-gray-200 flex items-center justify-between ${className}`}>
      <h2 className="text-lg font-semibold">{children}</h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="sr-only">Close panel</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

