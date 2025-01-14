'use client'

import { BaseAnimationProps } from '../types/animation-types'

interface ProgressCircleProps extends BaseAnimationProps {
  progress: number
}

export function ProgressCircle({
  progress,
  className = '',
  size = 'md',
  color = 'currentColor',
  duration = 750
}: ProgressCircleProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  }

  const normalizedProgress = Math.min(100, Math.max(0, progress))
  const circumference = 2 * Math.PI * 11
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.2"
        />
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: `stroke-dashoffset ${duration}ms ease-in-out`
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
        {normalizedProgress}%
      </div>
    </div>
  )
}

