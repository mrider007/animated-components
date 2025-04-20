import React from 'react';
import { BaseProps, WithChildren, SizeProps } from '../../../types/common';

interface TextProps extends BaseProps, WithChildren, SizeProps {
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export const Text: React.FC<TextProps> = ({ children, className = '', size = 'md', weight = 'normal',...rest }) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <p {...rest} className={`${sizeClasses[size]} ${weightClasses[weight]} ${className}`}>
      {children}
    </p>
  );
};

