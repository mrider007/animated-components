import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

export interface TableCellProps extends BaseProps, React.TdHTMLAttributes<HTMLTableCellElement> {
  as?: 'td' | 'th';
  children?: React.ReactNode;
}

export const TableCell: React.FC<TableCellProps> = ({ children, className = '', as = 'td', ...rest }) => {
  const Tag = as;
  const baseClass = as === 'th'
    ? 'px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'
    : 'px-6 py-4 whitespace-nowrap text-sm text-gray-700';

  return (
    <Tag className={`${baseClass} ${className}`} {...rest}>
      {children}
    </Tag>
  );
};

