import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

export const ModalFooter: React.FC<BaseProps & WithChildren> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-t border-gray-100/60 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 ${className}`}>
      {children}
    </div>
  );
};

