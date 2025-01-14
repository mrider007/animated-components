'use client'

import { BaseAnimationProps } from '../types/animation-types'

interface WaveTextProps extends BaseAnimationProps {
  text: string
}

export function WaveText({
  text,
  className = '',
  size = 'md',
  color = 'currentColor',
  duration = 1500
}: WaveTextProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  }

  return (
    <div className={`flex items-center space-x-0.5 ${sizeClasses[size]} ${className}`}>
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-0.5em); }
        }
      `}</style>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            color,
            animation: `wave ${duration}ms ease-in-out ${i * 50}ms infinite`
          }}
        >
          {char}
        </span>
      ))}
    </div>
  )
}

