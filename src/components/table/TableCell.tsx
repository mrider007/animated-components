import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

interface TableCellProps extends BaseProps, WithChildren {
  as?: 'td' | 'th';
}

export const TableCell: React.FC<TableCellProps> = ({ children, className = '', as = 'td' }) => {
  const Tag = as;
  const baseClass = as === 'th' ? 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' : 'px-6 py-4 whitespace-nowrap text-sm text-gray-500';

  return (
    <Tag className={`${baseClass} ${className}`}>
      {children}
    </Tag>
  );
};

