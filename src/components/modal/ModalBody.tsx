import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

export const ModalBody: React.FC<BaseProps & WithChildren> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-5 text-gray-600 ${className}`}>
      {children}
    </div>
  );
};

