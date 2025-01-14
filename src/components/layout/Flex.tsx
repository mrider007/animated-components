import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

interface FlexProps extends BaseProps, WithChildren {
  direction?: 'row' | 'col';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch';
  wrap?: boolean;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  className = '',
  direction = 'row',
  justify = 'start',
  align = 'start',
  wrap = false,
}) => {
  const flexClass = `
    flex
    ${direction === 'col' ? 'flex-col' : 'flex-row'}
    ${`justify-${justify}`}
    ${`items-${align}`}
    ${wrap ? 'flex-wrap' : 'flex-nowrap'}
  `;

  return (
    <div className={`${flexClass} ${className}`}>
      {children}
    </div>
  );
};

