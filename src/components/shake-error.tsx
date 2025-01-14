'use client'

import { BaseAnimationProps } from '../types/animation-types'

interface ShakeErrorProps extends BaseAnimationProps {
  children: React.ReactNode
  shake?: boolean
}

export function ShakeError({
  children,
  className = '',
  size = 'md',
  color = '#ef4444',
  duration = 500,
  shake = false
}: ShakeErrorProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <div className={`inline-block ${sizeClasses[size]} ${className}`}>
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
      `}</style>
      <div
        style={{
          color,
          animation: shake ? `shake ${duration}ms ease-in-out` : 'none'
        }}
      >
        {children}
      </div>
    </div>
  )
}

