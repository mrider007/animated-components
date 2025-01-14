'use client'

import { LoadingProps } from '../types/animation-types'

export function PulseRing({
  className = '',
  size = 'md',
  color = 'currentColor',
  duration = 1500,
  isLoading = true
}: LoadingProps) {
  if (!isLoading) return null

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  }

  return (
    <div role="status" className={`relative ${sizeClasses[size]} ${className}`}>
      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-full h-full rounded-full absolute"
          style={{
            backgroundColor: color,
            opacity: 0.2,
            animation: `ping ${duration}ms cubic-bezier(0, 0, 0.2, 1) infinite`
          }}
        />
        <div
          className="w-full h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

