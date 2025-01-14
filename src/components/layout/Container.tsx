import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

interface ContainerProps extends BaseProps, WithChildren {
  fluid?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '', fluid = false }) => {
  const containerClass = fluid ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
  return (
    <div className={`${containerClass} ${className}`}>
      {children}
    </div>
  );
};

