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
  size?: 'sm' | 'md' | 'lg' | 'xs' | 'xl';
  orientation?: 'horizontal' | 'vertical';
}

interface StepperColorData {
  active: string;
  inactive: string;
  connector: string;
}

const colorClasses: Record<Color | string, StepperColorData> = {
  primary: { active: 'bg-blue-600 text-white shadow-md shadow-blue-500/20', inactive: 'bg-blue-50 text-blue-500 border border-blue-200', connector: 'bg-blue-200' },
  secondary: { active: 'bg-gray-600 text-white shadow-md shadow-gray-500/20', inactive: 'bg-gray-50 text-gray-500 border border-gray-200', connector: 'bg-gray-200' },
  success: { active: 'bg-green-600 text-white shadow-md shadow-green-500/20', inactive: 'bg-green-50 text-green-500 border border-green-200', connector: 'bg-green-200' },
  danger: { active: 'bg-red-600 text-white shadow-md shadow-red-500/20', inactive: 'bg-red-50 text-red-500 border border-red-200', connector: 'bg-red-200' },
  warning: { active: 'bg-yellow-500 text-white shadow-md shadow-yellow-500/20', inactive: 'bg-yellow-50 text-yellow-600 border border-yellow-200', connector: 'bg-yellow-200' },
  info: { active: 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20', inactive: 'bg-cyan-50 text-cyan-600 border border-cyan-200', connector: 'bg-cyan-200' },
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

  const activeColorTheme = colorClasses[color.active || 'primary']?.active || colorClasses.primary.active;
  const inactiveColorTheme = colorClasses[color.inactive || 'primary']?.inactive || colorClasses.primary.inactive;
  const connectorColorTheme = colorClasses[color.connector || 'primary']?.connector || colorClasses.primary.connector;

  return (
    <div className={`flex w-full ${isVertical ? 'flex-col space-y-4' : 'flex-row justify-between items-center'} ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <React.Fragment key={index}>
            <div className={`relative flex ${isVertical ? 'flex-row items-start' : 'flex-col items-center'} flex-1`}>

              {/* Step Content Wrapper */}
              <div className={`flex ${isVertical ? 'flex-col items-center mr-4' : 'flex-col items-center w-full'} z-10`}>
                {/* Step Indicator */}
                <div
                  className={`flex items-center justify-center rounded-full transition-all duration-300 ${isCompleted || isCurrent ? activeColorTheme : inactiveColorTheme
                    } ${isCurrent ? 'ring-4 ring-black/5 scale-110' : ''} ${sizeClasses[size]}`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5 animate-[bounce_0.3s_ease-out]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="font-semibold">{index + 1}</span>
                  )}
                </div>

                {/* Step Label (Horizontal mode) */}
                {!isVertical && (
                  <div className={`mt-3 text-sm font-medium text-center ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step}
                  </div>
                )}
              </div>

              {/* Step Label (Vertical mode) */}
              {isVertical && (
                <div className={`mt-1 text-sm font-medium ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step}
                </div>
              )}

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className={`absolute pointer-events-none ${isVertical
                    ? 'w-[2px] h-[calc(100%+16px)] left-[calc(50%-1px)] top-[100%] origin-top'
                    : 'h-[2px] w-[calc(100%-2rem)] left-[calc(50%+1rem)] top-[calc(1rem-1px)] origin-left'
                  } ${isCompleted ? activeColorTheme.split(' ')[0] : connectorColorTheme} transition-colors duration-500`}
                />
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
