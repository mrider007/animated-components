'use client'

import { LoadingProps } from '../types/animation-types'

export function TypingDots({
  className = '',
  size = 'md',
  color = 'currentColor',
  duration = 1500,
  isLoading = true
}: LoadingProps) {
  if (!isLoading) return null

  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  }

  return (
    <div role="status" className={`flex items-center space-x-1 ${sizeClasses[size]} ${className}`}>
      <style jsx>{`
        @keyframes typing {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-40%); }
        }
      `}</style>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            animation: `typing ${duration}ms ease-in-out ${i * 150}ms infinite`
          }}
        />
      ))}
      <span className="sr-only">Typing...</span>
    </div>
  )
}

