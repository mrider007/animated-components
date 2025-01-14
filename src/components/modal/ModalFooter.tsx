import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

export const ModalFooter: React.FC<BaseProps & WithChildren> = ({ children, className = '' }) => {
  return (
    <div className={`px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ${className}`}>
      {children}
    </div>
  );
};

