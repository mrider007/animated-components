import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

export const ModalBody: React.FC<BaseProps & WithChildren> = ({ children, className = '' }) => {
  return (
    <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${className}`}>
      {children}
    </div>
  );
};

