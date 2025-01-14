import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

interface GridProps extends BaseProps, WithChildren {
  cols?: number;
  gap?: number;
}

export const Grid: React.FC<GridProps> = ({ children, className = '', cols = 3, gap = 4 }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cols} gap-${gap} ${className}`}>
      {children}
    </div>
  );
};

