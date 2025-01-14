import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

export const OffcanvasBody: React.FC<BaseProps & WithChildren> = ({ children, className = '' }) => {
  return (
    <div className={`p-4 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};

