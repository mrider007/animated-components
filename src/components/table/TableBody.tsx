import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

export const TableBody: React.FC<BaseProps & WithChildren> = ({ children, className = '' }) => {
  return (
    <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  );
};

