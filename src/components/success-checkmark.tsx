'use client'

import { SuccessProps } from '../types/animation-types'
import { useEffect } from 'react'

export function SuccessCheckmark({
  className = '',
  size = 'md',
  color = '#22c55e',
  duration = 750,
  onComplete
}: SuccessProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  }

  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(onComplete, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onComplete])

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <style jsx>{`
        @keyframes scale {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        @keyframes check {
          0% { stroke-dashoffset: 48; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full"
          style={{
            animation: `scale ${duration * 0.5}ms ease-in-out forwards`
          }}
        >
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="none"
            stroke={color}
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
            strokeDasharray="69"
            strokeDashoffset="69"
            style={{
              animation: `check ${duration}ms ease-in-out forwards`
            }}
          />
          <path
            d="M7 13l3 3 7-7"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="48"
            strokeDashoffset="48"
            style={{
              animation: `check ${duration}ms ease-in-out ${duration * 0.5}ms forwards`
            }}
          />
        </svg>
      </div>
    </div>
  )
}

