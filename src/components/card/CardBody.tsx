import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

export const CardBody: React.FC<BaseProps & WithChildren> = ({ children, className = '' }) => {
  return (
    <div className={`px-4 py-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
};

