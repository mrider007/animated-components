import React from 'react';
import { BaseProps } from '../../../types/common';

interface SkeletonProps extends BaseProps {
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', width = '100%', height = '20px' }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ width, height }}
    ></div>
  );
};

