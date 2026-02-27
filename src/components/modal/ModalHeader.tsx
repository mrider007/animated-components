import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

export const ModalHeader: React.FC<BaseProps & WithChildren> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-100/60 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 tracking-tight">{children}</h3>
    </div>
  );
};

