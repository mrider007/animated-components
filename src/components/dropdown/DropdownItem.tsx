import React from 'react';
import { BaseProps, WithChildren } from '../../../types/common';

export interface DropdownItemProps extends BaseProps, WithChildren {
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void;
  /** Link destination */
  href?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Render as a different element */
  as?: 'a' | 'button' | 'div';
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  className = '',
  onClick,
  href,
  disabled = false,
  as,
  ...rest
}) => {
  const baseClasses = `block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`;

  // Auto-detect element type
  const Element = as || (href ? 'a' : onClick ? 'button' : 'a');

  if (Element === 'button') {
    return (
      <button
        type="button"
        className={baseClasses}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        role="menuitem"
        {...rest}
      >
        {children}
      </button>
    );
  }

  if (Element === 'div') {
    return (
      <div
        className={baseClasses}
        onClick={disabled ? undefined : onClick}
        role="menuitem"
        {...rest}
      >
        {children}
      </div>
    );
  }

  return (
    <a
      href={disabled ? undefined : (href || '#')}
      className={baseClasses}
      onClick={disabled ? (e: React.MouseEvent) => e.preventDefault() : onClick}
      role="menuitem"
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </a>
  );
};
