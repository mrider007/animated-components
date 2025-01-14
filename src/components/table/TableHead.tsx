import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

export const TableHead: React.FC<BaseProps & WithChildren> = ({ children, className = '' }) => {
  return (
    <thead className={`bg-gray-50 ${className}`}>
      {children}
    </thead>
  );
};

