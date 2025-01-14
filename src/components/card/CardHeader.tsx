import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

export const CardHeader: React.FC<BaseProps & WithChildren> = ({ children, className = '' }) => {
  return (
    <div className={`px-4 py-5 sm:px-6 ${className}`}>
      {children}
    </div>
  );
};

