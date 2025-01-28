import React from 'react';
import { BaseProps } from '../../../types/common';

type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface StepperProps extends BaseProps {
  steps: string[];
  currentStep: number;
  color?: {
    active?: Color;
    inactive?: Color;
    connector?: Color;
  };
  size?: 'sm' | 'md' | 'lg' | 'xs'|'xl';
  orientation?: 'horizontal' | 'vertical';
}

const colorClasses: Record<Color, { active: string; inactive: string; connector: string }> = {
  primary: { active: 'bg-blue-600 text-white', inactive: 'bg-blue-200 text-white', connector: 'bg-blue-200' },
  secondary: { active: 'bg-gray-600 text-white', inactive: 'bg-gray-200 text-white', connector: 'bg-gray-200' },
  success: { active: 'bg-green-600 text-white', inactive: 'bg-green-200 text-white', connector: 'bg-green-200' },
  danger: { active: 'bg-red-600 text-white', inactive: 'bg-red-200 text-white', connector: 'bg-red-200' },
  warning: { active: 'bg-yellow-500 text-black', inactive: 'bg-yellow-100 text-black', connector: 'bg-yellow-100' },
  info: { active: 'bg-teal-500 text-white', inactive: 'bg-teal-200 text-white', connector: 'bg-teal-200' },
};

export const Stepper: React.FC<StepperProps> = ({
  className = '',
  steps,
  currentStep,
  color = {
    active: 'primary',
    inactive: 'primary',
    connector: 'primary',
  },
  size = 'md',
  orientation = 'horizontal',
}) => {
  const sizeClasses = {
    xs: 'w-5 h-5 text-xs',
    sm: 'w-6 h-6 text-sm',
    md: 'w-8 h-8 text-base',
    lg: 'w-10 h-10 text-lg',
    xl: 'w-12 h-12 text-xl',
  };

  const isVertical = orientation === 'vertical';

  const activeColorClass = colorClasses[color.active || 'primary'].active;
  const inactiveColorClass = colorClasses[color.inactive || 'primary'].inactive;
  const connectorColorClass = colorClasses[color.connector || 'primary'].connector;

  return (
    <div className={`flex ${isVertical ? 'flex-col' : 'items-center'} ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className={`flex ${isVertical ? 'flex-col items-center' : 'items-center'}`}>
            {/* Step Indicator */}
            <div
              className={`flex items-center justify-center rounded-full ${
                index < currentStep
                  ? activeColorClass
                  : index === currentStep
                  ? `border-2 ${inactiveColorClass}`
                  : inactiveColorClass
              } ${sizeClasses[size]}`}
            >
              {index < currentStep ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 ${isVertical ? 'w-1 h-8' : 'h-1 mx-2'} ${
                  index < currentStep ? activeColorClass : connectorColorClass
                }`}
              ></div>
            )}
          </div>

          <div
            className={`${
              isVertical ? 'text-center mt-2 mb-4' : 'hidden sm:block text-xs text-center mx-2'
            }`}
          >
            {step}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
