import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

export const ModalHeader: React.FC<BaseProps & WithChildren> = ({ children, className = '' }) => {
  return (
    <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${className}`}>
      <h3 className="text-lg leading-6 font-medium text-gray-900">{children}</h3>
    </div>
  );
};

