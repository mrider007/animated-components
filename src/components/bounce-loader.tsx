'use client'

import { LoadingProps } from '../types/animation-types'

export function BounceLoader({
  className = '',
  size = 'md',
  color = 'currentColor',
  duration = 1200,
  isLoading = true
}: LoadingProps) {
  if (!isLoading) return null

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  }

  return (
    <div role="status" className={`relative ${sizeClasses[size]} ${className}`}>
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-100%); }
        }
      `}</style>
      <div className="flex space-x-1 h-full items-end">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: color,
              animation: `bounce ${duration}ms ease-in-out ${i * 150}ms infinite`
            }}
          />
        ))}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

