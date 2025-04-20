import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

export const DropdownItem: React.FC<BaseProps & WithChildren> = ({ children, className = '' ,...rest}) => {
  return (
    <a
    {...rest}
      href="#"
      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${className}`}
      role="menuitem"
    >
      {children}
    </a>
  );
};

