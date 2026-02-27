import React, { useState } from 'react';
import { motion, AnimatePresence, HTMLMotionProps, MotionProps } from 'framer-motion';
import { BaseProps, RadiusProps, VariantProps } from '../../../types/common';

export type NavbarVariant = 'flat' | 'solid' | 'glass' | 'elevated' | string;

export interface NavbarProps extends BaseProps, RadiusProps, Omit<HTMLMotionProps<"nav">, "children" | "className" | "variant"> {
  /** Brand/logo element */
  brand?: React.ReactNode;
  /** Variant of the navbar */
  variant?: NavbarVariant;
  /** Whether the navbar should stick to the top */
  sticky?: boolean;
  /** Container max-width wrapper class */
  containerClassName?: string;
  /** Class for desktop menu wrapper */
  desktopMenuClassName?: string;
  /** Class for mobile menu wrapper */
  mobileMenuWrapperClassName?: string;
  /** Custom hamburger icon */
  menuIcon?: React.ReactNode;
  /** Custom close icon */
  closeIcon?: React.ReactNode;
  /** Framer Motion props for nav container */
  navMotion?: Partial<MotionProps>;
  /** Framer Motion props for mobile menu */
  mobileMotion?: Partial<MotionProps>;
  /** Optional children */
  children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  children,
  className = '',
  variant = 'flat',
  radius = 'none',
  sticky = false,
  containerClassName = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  desktopMenuClassName = 'hidden md:flex items-center space-x-2 md:space-x-4',
  mobileMenuWrapperClassName = 'md:hidden shadow-lg border-t border-gray-100',
  menuIcon,
  closeIcon,
  navMotion,
  mobileMotion,
  ...rest
}) => {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen(prev => !prev);

  const getRadiusClasses = () => {
    switch (radius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case 'xl': return 'rounded-xl';
      case '2xl': return 'rounded-2xl';
      case 'full': return 'rounded-full';
      default: return `rounded-${radius}`;
    }
  };

  const variantStyles: Record<string, { nav: string; mobileBg: string; text: string; toggleRow: string }> = {
    flat: { nav: 'bg-white border-b border-gray-100', mobileBg: 'bg-white', text: 'text-gray-800', toggleRow: 'text-gray-600 focus:ring-gray-400' },
    solid: { nav: 'bg-gray-900', mobileBg: 'bg-gray-900 border-gray-800', text: 'text-white', toggleRow: 'text-gray-300 focus:ring-gray-600' },
    glass: { nav: 'backdrop-blur-md bg-white/70 border-b border-white/20', mobileBg: 'backdrop-blur-lg bg-white/90', text: 'text-gray-800', toggleRow: 'text-gray-600 focus:ring-gray-400' },
    elevated: { nav: 'bg-white shadow-md shadow-gray-200/50', mobileBg: 'bg-white', text: 'text-gray-800', toggleRow: 'text-gray-600 focus:ring-gray-400' },
  };

  const theme = variantStyles[variant] || variantStyles.flat;

  return (
    <div className={`w-full ${sticky ? 'sticky top-0 z-50' : 'relative z-40'}`}>
      <motion.nav
        className={`w-full flex flex-col ${theme.nav} ${getRadiusClasses()} ${className}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        {...navMotion}
        {...rest}
      >
        <div className={`${containerClassName} flex items-center justify-between h-16 w-full`}>
          <div className="flex-shrink-0 flex items-center">
            {brand}
          </div>

          <div className={`${desktopMenuClassName} ${theme.text}`}>
            {children}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobile}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${theme.toggleRow}`}
            >
              {isMobileOpen ? (
                closeIcon || (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )
              ) : (
                menuIcon || (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className={`absolute left-0 right-0 w-full overflow-hidden ${mobileMenuWrapperClassName} ${theme.mobileBg} ${theme.text} z-40`}
            initial={{ height: 0, opacity: 0, originY: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            {...mobileMotion}
          >
            <div className={`px-4 pt-2 pb-4 space-y-1 flex flex-col ${getRadiusClasses()}`}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
