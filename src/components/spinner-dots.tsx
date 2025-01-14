'use client'

import { LoadingProps } from '../types/animation-types'

export function SpinnerDots({ 
  className = '',
  size = 'md',
  color = 'currentColor',
  duration = 1000,
  isLoading = true 
}: LoadingProps) {
  if (!isLoading) return null
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div role="status" className={`relative ${sizeClasses[size]} ${className}`}>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: color,
              animation: `pulse ${duration}ms ease-in-out ${i * 150}ms infinite`
            }}
          />
        ))}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

