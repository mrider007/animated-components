import React, { useState } from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { BaseProps, WithChildren } from '../../../types/common';

/**
 * Fully customizable, responsive Navbar with mobile menu.
 * All styling and behavior can be overridden via props.
 */
interface NavbarProps extends BaseProps, WithChildren {
  /** Brand/logo element */
  brand?: React.ReactNode;
  /** Tailwind class for navbar background */
  bgColorClass?: string;
  /** Tailwind class for navbar text */
  textColorClass?: string;
  /** Tailwind class for hover state on menu items */
  hoverTextColorClass?: string;
  /** Tailwind class for navbar shadow */
  shadowClass?: string;
  /** Container max-width wrapper class */
  containerClassName?: string;
  /** Class for desktop menu wrapper */
  desktopMenuClassName?: string;
  /** Class for mobile menu wrapper */
  mobileMenuWrapperClassName?: string;
  /** Class for individual mobile menu item */
  mobileMenuItemClassName?: string;
  /** Custom hamburger icon */
  menuIcon?: React.ReactNode;
  /** Custom close icon */
  closeIcon?: React.ReactNode;
  /** Framer Motion props for nav container */
  navMotion?: Partial<MotionProps>;
  /** Framer Motion props for mobile menu */
  mobileMotion?: Partial<MotionProps>;
  duration?: number;
  loop?: boolean;
}

export const CustomizableNavbar: React.FC<NavbarProps> = ({
  brand,
  children,
  className = '',
  bgColorClass = 'bg-white',
  textColorClass = 'text-gray-800',
  hoverTextColorClass = 'hover:text-gray-600',
  shadowClass = 'shadow',
  containerClassName = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  desktopMenuClassName = 'hidden md:flex items-center space-x-4',
  mobileMenuWrapperClassName = 'md:hidden bg-white shadow-md',
  mobileMenuItemClassName = 'block px-4 py-2',
  menuIcon,
  closeIcon,
  navMotion,
  mobileMotion,
  duration = 0.3,
  loop = false,
  ...rest
}) => {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen(prev => !prev);
  const transition = {
    duration,
    ...(loop ? { repeat: Infinity, repeatType: 'loop' } : {}),
  };

  return (
    <>
      <motion.nav
        className={`flex items-center justify-between ${bgColorClass} ${shadowClass} ${className}`}
        initial="hidden"
        animate="visible"
        transition={{ transition }}
        {...navMotion}
        {...rest}
      >
        <div className={containerClassName + ' flex items-center justify-between h-16'}>
          <div className="flex-shrink-0">
            {brand}
          </div>

          <div className={desktopMenuClassName + ` ${textColorClass}`}>
            {React.Children.map(children, child => (
              <div className={`${hoverTextColorClass}`}>{child}</div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobile}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              className={`${textColorClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400`}
            >
              {isMobileOpen
                ? closeIcon || (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )
                : menuIcon || (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className={mobileMenuWrapperClassName + ` ${textColorClass}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            {...mobileMotion}
          >
            <div className="space-y-2 py-2">
              {React.Children.map(children, child => (
                <div className={`${mobileMenuItemClassName} ${hoverTextColorClass}`}>{child}</div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
